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
  nextSteps: z.array(z.string()).max(3),
  overallScore: z.number().min(0).max(10),
});

export const analyze = async (transcript: object) => {
  const response = await client.responses.parse({
    model: "gpt-4o-mini",
    instructions: `
    You are an F1 visa interviewer evaluating a practice interview. 
    You will receive a complete interview transcript with 5 practice questions and the applicant's answers.
    Analyze the answers only and provide indepth feedback on strengths, weaknesses, next steps, and an overall score all based on:
     - content accuracy
     - completeness
     - potential red flags for visa officers.

     If a specific strength or weakness references a particular question's response, format it as:

    "Question: [the question text]\n
    \n
    Feedback: [your feedback]"

    Each feedback string (strengths, weaknesses, and next steps) should be 2-3 sentences long.
    Response should match the JSON format; max 3 items per list; empty arrays allowed if no notable strengths/weaknesses/next steps.`,
    input: JSON.stringify(transcript),
    text: { format: zodTextFormat(Evaluation, "evaluation") },
  });
  console.log(JSON.parse(response.output_text));
  return JSON.parse(response.output_text);
};

export const generateFollowUp = async (question: string, answer: string) => {
  const response = await client.responses.parse({
    model: "gpt-4o-mini",
    instructions: `You are an F1 visa interviewer conducting a practice interview.
    Based on the applicant's answer, generate a relevant follow-up question that:
    - Probes deeper into their response
    - Clarifies any vague points
    - Tests their consistency and honesty
    - Explores potential concerns a visa officer might have
    
    Keep the followup question concise, similar in length to the input question.
    Return only the follow-up question as plain text, nothing else.`,
    input: `Question: ${question}\nAnswer: ${answer}`,
  });
  return response.output_text;
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
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string): boolean => {
  return bcrypt.compareSync(plain, hashed);
};
