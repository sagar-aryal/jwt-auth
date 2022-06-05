import bcrypt from "bcrypt";

import Users from "../models/Users.js";

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

      // create access token
      const accessToken = user.getAccessToken();

      res
        .status(200)
        .json({ success: true, message: "successful", data: accessToken });
    } else {
      res
        .status(400)
        .json({ success: false, message: "User exist already.", data: {} });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, data: {} });
  }
};

// Login a user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check if the user exist in the db
    const user = await Users.findOne({ email }); // email = req.body.email

    if (user) {
      // match the hashed password from user db
      const match = await user.matchPassword(password);
      if (match) {
        // create access token
        const accessToken = user.getAccessToken();

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
