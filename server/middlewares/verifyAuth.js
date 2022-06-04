import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      const token = authHeader.spilit(" ")[1];

      const isValid = await jwt.verify(token, process.env.SECRET_KEY);

      if (isValid) next();
      else {
      }
      res.status(403).json({ success: false, message: "Invalid Token" });
    } catch (err) {
      res.status(403).json({ success: false, message: err.message });
    }
  }
};
