import { Request, Response, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
} from "../utils/constants";

const authRouter = Router();

authRouter.get("/logout", (_req: Request, _res: Response) => {});

// auth google route using passport
authRouter
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/failed",
    }),
    (req: Request, res: Response) => {
      if (!req.user) {
        res.status(401).json({
          success: false,
          msg: "failed to fetch user",
        });
      }

      const userPayload = req.user as any;

      const token = jwt.sign({ userId: userPayload.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_LIFE,
      });

      const refreshToken = jwt.sign(
        { userId: userPayload.id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_LIFE }
      );

      res
        .status(200)
        .json({ success: true, userId: userPayload.id, token, refreshToken });
    }
  )
  .get("/google/failed", (_req: Request, res: Response) => {
    res.status(400).json({
      success: false,
      msg: "user failed to authenticate",
    });
  });

export default authRouter;
