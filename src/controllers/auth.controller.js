import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, fullName, address, business, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullName,
      email: email,
      address: address,
      businessName: business,
      password: hashedPassword,
      phoneNumber: phone
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      fullName: userSaved.fullName,
      email: userSaved.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There is a problem registering your account" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: "There is a problem logging your account" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.json({ message: 'Logout succesfull' });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(400).json({message: "User not found"})

  return res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      fullName: userFound.fullName,
      address: userFound.address,
      businessName: userFound.businessName,
      phoneNumber: userFound.phoneNumber,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
  })
}
