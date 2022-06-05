import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import { verifyAuth } from "./middlewares/verifyAuth.js";

const app = express();

// get env vars
dotenv.config();

const port = process.env.PORT || 8000;

// needed to be able to read body data
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// cookieparser
app.use(cookieParser());

// using cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", verifyAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "This is our secret page. You are successfully verified and logged in.",
  });
});

// routers
app.use("/auth", authRouter);

// connect to database
connectDB();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
