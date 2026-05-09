import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-it';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed);
};

export const signToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
