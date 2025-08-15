import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashPassword,
        name,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User does not exist!" });
    }

    const comparePassword = await bcrypt.compare(password, existingUser.password);

    if (!comparePassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
        image: existingUser.image,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const check = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
