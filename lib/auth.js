// this file has admin login
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin.id,
      role: admin.role,
      email: admin.emails,
    },
    JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};