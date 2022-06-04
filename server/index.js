import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";

const app = express();

// get env vars
dotenv.config();

const port = process.env.PORT || 8000;

// needed to be able to read body data
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// using cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// cookieparser
// app.use(cookieParser);

/* app.get("/", (req, res) => {
  res.status(200).json({ name: "server", status: "running" });
}); */

// routers
app.use("/auth", authRouter);

// connect to database
connectDB();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
