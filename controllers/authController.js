import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { hashedPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJwt } from "../utils/tokenUtils.js";

export const getUsers = async (req, res) => {
  const user = await User.find({});
  res.status(200).json({ user });
};
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPass = await hashedPassword(req.body.password);
  req.body.password = hashedPass;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ data: "successfull user created" });
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("User not found");
    throw new UnauthenticatedError("invalid credentials");
  }

  const isValidUser = await comparePassword(req.body.password, user.password);
  if (!isValidUser) {
    console.log("Password mismatch");
    throw new UnauthenticatedError("invalid credentials");
  }

  const token = createJwt({ userId: user._id, role: user.role });
  console.log("Token created:", token);

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Login Successful" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user Logged Out!" });
};
