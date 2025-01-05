import { Request, Response } from "express";

export const signUp = (req: Request, res: Response) => {
  res.json({
    test: "this is a test from the controller",
  });
};
export const login = (req: Request, res: Response) => {
  res.json({
    test: "this is a test from the login",
  });
};
export const logout = (req: Request, res: Response) => {
  res.json({
    test: "this is a test from the logout",
  });
};
export const fa_Setup = (req: Request, res: Response) => {
  res.json({
    test: "this is a test from the controller",
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
