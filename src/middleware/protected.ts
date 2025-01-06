import { NextFunction, Request, Response } from "express";

export const protectedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
