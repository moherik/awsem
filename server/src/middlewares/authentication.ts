import { NextFunction, Request, Response } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }

  res.status(401).json("unauthorized");
};
