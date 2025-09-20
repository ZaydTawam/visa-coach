import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import OpenAI, { toFile } from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

dotenv.config();
const OPENAI_API_KEY = process.env.API_KEY;
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

const Evaluation = z.object({
  strengths: z.array(z.string()).max(3),
  weaknesses: z.array(z.string()).max(3),
});

export const analyze = async (transcript: object) => {
  const response = await client.responses.parse({
    model: "gpt-5-nano",
    instructions: `You are an F1 visa interviewer evaluating a practice interview. 
    You will receive a complete interview transcript with practice questions and the applicant's answers.
    Analyze the answers only and provide strengths and weaknesses based on content accuracy, completeness, and potential red flags for visa officers.
    Response should match the JSON format max 3 per list; empty arrays allowed if no notable strengths/weaknesses.`,
    input: JSON.stringify(transcript),
    text: { format: zodTextFormat(Evaluation, "evaluation") },
  });
  console.log(JSON.parse(response.output_text));
  return JSON.parse(response.output_text);
};

export const transcribeAudio = async (
  file: Express.Multer.File
): Promise<string> => {
  if (!file || !file.buffer) throw new Error("No audio file buffer provided");
  const tryModels = ["gpt-4o-mini-transcribe", "whisper-1"];

  let lastErr: unknown;
  for (const model of tryModels) {
    try {
      const res = await client.audio.transcriptions.create({
        file: await toFile(file.buffer, file.originalname || "audio.webm", {
          type: file.mimetype || "audio/webm",
        }),
        model,
        language: "en",
      });
      return res.text as string;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Transcription failed");
};

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string): boolean => {
  return bcrypt.compareSync(plain, hashed);
};
