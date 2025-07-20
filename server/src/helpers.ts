import * as bcrypt from 'bcrypt'

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string): boolean => {
  return bcrypt.compareSync(plain, hashed);
};