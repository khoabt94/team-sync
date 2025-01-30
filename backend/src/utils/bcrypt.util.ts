import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, saltRound: number = 10): Promise<string> => {
  return bcrypt.hash(password, saltRound);
};

export const comparePassword = async (candidate: string, password: string): Promise<boolean> => {
  return bcrypt.compare(candidate, password);
};
