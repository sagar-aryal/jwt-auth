import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import Users from "../models/Users.js";

dotenv.config();
const secret = process.env.SECRET_KEY;

// Register a user
export const signup = async (req, res, next) => {
  const { firstname, lastname, email, password, isAdmin } = req.body;

  try {
    // check if the user exist in the db
    const match = await Users.findOne({ email }); // email = req.body.email

    // If not user exist already, create new user.
    if (!match) {
      const user = await Users.create({
        firstname,
        lastname,
        email,
        password,
        isAdmin,
      });
      res
        .status(200)
        .json({ success: true, message: "successful", data: user });
    } else {
      res
        .status(400)
        .json({ success: false, message: "User exist already.", data: {} });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, data: {} });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check if the user exist in the db
    const user = await Users.findOne({ email }); // email = req.body.email

    if (user) {
      // match password from user db
      const match = bcrypt.compareSync(password, user.password);
      if (match) {
        // generate access token
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          secret,
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({ success: true, message: "successful", data: accessToken });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Incorrect credientials", data: {} });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, data: {} });
  }
};
