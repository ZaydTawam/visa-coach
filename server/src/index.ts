import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { hashPassword } from './helpers';
import './user-schema'
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { IUser, User } from './user-schema';
import './local-strategy';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

mongoose
  .connect('mongodb://127.0.0.1/visa_coach')
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(`Error: ${err}`));
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(session({
  secret: 'temp key',
  saveUninitialized: false,
  resave: false,
  rolling: true,
  cookie: { maxAge: 1000 * 60 * 60  },
  store: MongoStore.create({
    client: mongoose.connection.getClient()
  })

}))

app.use(passport.initialize())
app.use(passport.session())

app.post('/api/auth', passport.authenticate('local'), (request, response) => {
  response.sendStatus(200);
})

app.get('/api/auth/status', (request, response) => {
  if (request.user) response.sendStatus(200);
  else response.sendStatus(401);
})

app.post('/api/auth/register', async (request, response) => {
  request.body.password = hashPassword(request.body.password);
  const newUser = new User(request.body);
  try {
    const savedUser = await newUser.save();
    response.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    response.sendStatus(400);
  }
})

app.post('/api/auth/logout', (request, response) => {
  if (!request.user) {
    response.sendStatus(401);
    return;
  }
  request.logout((err) => {
    if (err) return response.sendStatus(400);
    request.session.destroy((err) => {
      if (err) return response.sendStatus(500);
      response.clearCookie('connect.sid');
      response.sendStatus(200);
    });
  });
});

app.delete('/api/account', async (request, response) => {
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
      response.clearCookie('connect.sid');
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

app.get('/api/interviews', (request, response) => {
  if (!request.user) response.sendStatus(401);
  else response.status(200).send(request.user.interviews);
})

app.post('/api/interview/start', async (request, response) => {
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
    response.status(200).send(user.interviews[user.interviews.length-1].id);
  } catch (err) {
    console.error(err);
    response.sendStatus(500);
  }
})

app.get('/api/interview/:id/', async (request, response) => {
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
  console.log(interview.responses.length, interview.id)
  response.status(200).send({questionNumber: interview.responses.length+1, id: interview.id });
})

app.post('/api/interview/:id/answer', async (request, response) => {
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
  if (interview.status === 'completed' || interview.responses.length === 5) {
    response.sendStatus(400);
    return;
  }
  const { question, answer } = request.body;
  interview.responses.push({question, answer});
  if (interview.responses.length == 5) {
    interview.status = 'completed'
  }
  try {
    await user.save();
    response.sendStatus(200);
  } catch (err) {
    console.error(err);
    response.sendStatus(500);
  }
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})