import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// bcrypt password before saving to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// sign JWT and return
userSchema.methods.getAccessToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

// match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Users = mongoose.model("Users", userSchema);

export default Users;
