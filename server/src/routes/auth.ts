import { Request, Response, Router } from "express";
import passport from "passport";
import AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/login", AuthController.login);

authRouter
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (_req: Request, res: Response) => {
      res.redirect("/");
    }
  );

export default authRouter;
