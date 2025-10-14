import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import {
  analyze,
  generateFollowUp,
  transcribeAudio,
  hashPassword,
} from "./helpers";
import "./user-schema";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { IUser, User } from "./user-schema";
import "./local-strategy";
import multer from "multer";
import axios from "axios";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

mongoose
  .connect("mongodb://127.0.0.1/visa_coach")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));
const app = express();
const PORT = 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "temp key",
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/auth/status", (request, response) => {
  if (request.user) response.sendStatus(200);
  else response.sendStatus(401);
});

app.post(
  "/api/auth/login",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

app.post("/api/auth/register", async (request, response) => {
  request.body.password = hashPassword(request.body.password);
  const newUser = new User(request.body);
  try {
    const savedUser = await newUser.save();
    response.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    response.sendStatus(400);
  }
});

app.post("/api/auth/logout", (request, response) => {
  if (!request.user) {
    response.sendStatus(401);
    return;
  }
  request.logout((err) => {
    if (err) return response.sendStatus(400);
    request.session.destroy((err) => {
      if (err) return response.sendStatus(500);
      response.clearCookie("connect.sid");
      response.sendStatus(200);
    });
  });
});

app.delete("/api/account", async (request, response) => {
  if (!request.user) {
    response.sendStatus(401);
    return;
  }
  const userId = request.user._id;
  request.logout(async (err) => {
    if (err) {
      return response.sendStatus(400);
    }
    request.session.destroy(async (err) => {
      if (err) {
        return response.sendStatus(500);
      }
      response.clearCookie("connect.sid");
      try {
        await User.findByIdAndDelete(userId);
        response.sendStatus(204);
      } catch (err) {
        console.error(err);
        response.sendStatus(500);
      }
    });
  });
});

app.get("/api/interviews", (request, response) => {
  if (!request.user) response.sendStatus(401);
  else response.status(200).send(request.user.interviews);
});

app.get("/api/interview/:id/analysis", async (request, response) => {
  if (!request.user) {
    response.sendStatus(401);
    return;
  }
  const user = await User.findById(request.user._id);
  if (!user) {
    response.sendStatus(404);
    return;
  }
  const interview = user.interviews.id(request.params.id);
  if (!interview) {
    response.sendStatus(404);
    return;
  }
  if (
    interview.status !== "completed" ||
    (!interview.feedback.strengths && !interview.feedback.weaknesses)
  ) {
    response.sendStatus(400);
    return;
  }
  response.status(200).send(interview.feedback);
});

app.post("/api/interview/start", async (request, response) => {
  if (!request.user) {
    response.sendStatus(401);
    return;
  }
  const user = await User.findById(request.user._id);
  if (!user) {
    response.sendStatus(404);
    return;
  }
  user.interviews.push({});
  try {
    await user.save();
    response.status(200).send(user.interviews[user.interviews.length - 1].id);
  } catch (err) {
    console.error(err);
    response.sendStatus(500);
  }
});

app.get("/api/interview/:id/", async (request, response) => {
  if (!request.user) {
    response.sendStatus(401);
    return;
  }
  const user = await User.findById(request.user._id);
  if (!user) {
    response.sendStatus(404);
    return;
  }
  const interview = user.interviews.id(request.params.id);
  if (!interview) {
    response.sendStatus(404);
    return;
  }
  if (interview.status === "completed") {
    response.send(400);
    return;
  }
  const { responses, id } = interview;
  const questionNumber = responses.length + 1;
  response.status(200).send({ questionNumber, id });
});

app.patch(
  "/api/interview/:id/answer",
  upload.single("audio"),
  async (request, response) => {
    if (!request.user) {
      response.sendStatus(401);
      return;
    }
    const user = await User.findById(request.user._id);
    if (!user) {
      response.sendStatus(404);
      return;
    }
    const interview = user.interviews.id(request.params.id);
    if (!interview) {
      response.sendStatus(404);
      return;
    }
    if (interview.status === "completed") {
      response.sendStatus(400);
      return;
    }
    const { responses } = interview;
    if (responses.length === 5) {
      response.sendStatus(400);
      return;
    }
    const { question } = request.body;
    const audioFile = request.file;
    if (!question || !audioFile) {
      response.sendStatus(400);
      return;
    }
    const answer = await transcribeAudio(audioFile);
    responses.push({ question, answer });

    let followupQuestion = "";

    try {
      const uncertaintyResponse = await axios.post(
        "http://localhost:5000/confidence",
        {
          text: answer,
        }
      );
      const isUncertain = uncertaintyResponse.data.uncertain;

      if (isUncertain) {
        followupQuestion = await generateFollowUp(question, answer);
      }
    } catch (err) {
      console.log("Error checking uncertainty:", err);
    }

    if (interview.responses.length == 5) {
      interview.status = "completed";
      const analysis = await analyze(interview.responses);
      interview.feedback = { ...analysis };
    }
    try {
      await user.save();
      if (followupQuestion) {
        response.status(200).send({ followupQuestion });
      } else {
        response.sendStatus(200);
      }
    } catch (err) {
      console.error(err);
      response.sendStatus(500);
    }
  }
);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
