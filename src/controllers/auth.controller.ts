import { Request, Response } from "express";
import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";
import { Creaet_user } from "../lib/types";
import speakeasy from "speakeasy";
import { User } from "@prisma/client";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";

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
export const fa_Setup = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const secret = speakeasy.generateSecret();
    const otp_url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: user.email,
      issuer: "www.naserswei.com",
      encoding: "base32",
    });
    const url_qrcode = await qrcode.toDataURL(otp_url);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        faSecret: secret.base32,
        faEnabled: true,
      },
    });

    res.json({ secret, url_qrcode });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const fa_verfiy = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const user = req.user as User;
    if (!user.faSecret) {
      res.status(400).json({ message: "2FA is not enabled" });
      return;
    }
    const verified = speakeasy.totp.verify({
      secret: user.faSecret,
      encoding: "base32",
      token,
    });
    if (verified) {
      const jwtToken = jwt.sign({ id: user.id }, "secret", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "2FA verified", jwtToken });
    } else {
      res.status(400).json({ message: "2FA verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const fa_reset = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (!user.faSecret) {
      res.status(400).json({ message: "2FA is not enabled" });
      return;
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        faSecret: null,
        faEnabled: false,
      },
    });
    res.json({ message: "2FA reset sessufully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
