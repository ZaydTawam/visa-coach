import mongoose, { Schema, Document, Model } from "mongoose";

export interface Interview {
  _id?: mongoose.Types.ObjectId;
  date: Date;
  status: "in-progress" | "completed";
  responses: { question: string; answer: string }[];
  feedback: {
    strengths: string[];
    weaknesses: string[];
    nextSteps: string[];
    overallScore: number;
  };
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  university: string;
  password: string;
  interviews: mongoose.Types.DocumentArray<Interview>;
}

const interviewSchema = new Schema<Interview>({
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress",
  },
  responses: {
    type: [
      {
        question: { type: String, required: true },
        answer: {
          type: String,
          default: "",
          required: function (this: any) {
            return this.status === "completed";
          },
        },
      },
    ],
    required: true,
    default: [],
  },
  feedback: {
    strengths: { type: [String], required: true, default: [] },
    weaknesses: { type: [String], required: true, default: [] },
    nextSteps: { type: [String], required: true, default: [] },
    overallScore: { type: Number, required: true, default: 0 },
  },
});

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
  },
  interviews: {
    type: [interviewSchema],
    default: [],
  },
});

export const User: Model<IUser> = mongoose.model("User", userSchema);
