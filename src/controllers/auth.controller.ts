import { Request, Response } from "express";
import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";
import { Creaet_user } from "../lib/types";

export const signUp = async (req: Request, res: Response) => {
  try {
    const valid = Creaet_user.safeParse(req.body);

    if (!valid.success) {
      res.status(400).json({ message: valid.error });
      return;
    }
    const { email, password } = valid.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = (req: Request, res: Response) => {
  console.log(req.user);

  res.json({ message: "login success" });
};
export const logout = (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.status(200).json({ message: "logout success" });
  });
};
export const fa_Setup = (req: Request, res: Response) => {
  res.json({
    test: "this is a test from the setup controller",
  });
};
export const fa_verfiy = (req: Request, res: Response) => {
  res.json({
    test: "this is a test from the controller",
  });
};
export const fa_reset = (req: Request, res: Response) => {
  res.json({
    test: "this is a test from the controller",
  });
};
