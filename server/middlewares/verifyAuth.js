import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET_KEY;

export const verifyAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    try {
      const token = authorization.split(" ")[1];

      const isValid = await jwt.verify(token, secret);

      if (isValid) next();
      else {
      }
      res.status(403).json({ success: false, message: "Invalid Token" });
    } catch (err) {
      res.status(403).json({ success: false, message: err.message });
    }
  }
};
