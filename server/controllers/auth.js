import Users from "../models/Users.js";

// Register a user
export const signup = async (req, res, next) => {
  const { firstname, lastname, email, password, isAdmin } = req.body;

  try {
    // check if the user exist in the db
    const match = await Users.findOne({ email }); // email = req.body.email

    // If not user exist already, create new user.
    if (match) {
      return res
        .status(400)
        .json({ success: false, message: "User exist already.", data: {} });
    }

    const user = await Users.create({
      firstname,
      lastname,
      email,
      password,
      isAdmin,
    });

    /*  // create access token
    const accessToken = user.getAccessToken(); */

    // send token in cookie
    sendTokenInCookie(user, res);
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

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email", data: {} });
    }

    // check if the hashed password matches from user db
    const match = await user.matchPassword(password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
        data: {},
      });
    }
    /*  // create access token
    const accessToken = user.getAccessToken(); */

    // send token in cookie
    sendTokenInCookie(user, res);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, data: {} });
  }
};

// get signed jwt token and create cookie
const sendTokenInCookie = (user, res) => {
  // create access token
  const accessToken = user.getAccessToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(200).cookie("accessToken", accessToken, options).json({
    success: true,
    message: "successful",
    data: user,
  });
};
