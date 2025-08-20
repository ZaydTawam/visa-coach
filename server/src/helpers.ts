import * as bcrypt from 'bcrypt'
import OpenAI from 'openai';
const client = new OpenAI();

// export const response = await client.responses.create({
//   model: "gpt-5",
//   instructions: "You are an F1 visa interviewer",
//   input: "Write a one-sentence bedtime story about a unicorn."
// })

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string): boolean => {
  return bcrypt.compareSync(plain, hashed);
};