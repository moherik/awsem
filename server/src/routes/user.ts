import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import { isAuth } from "../middlewares/authentication";

const userRouter = Router();

userRouter.get("/me", isAuth, (_req: Request, res: Response) => {
  res.send("helo me");
});

export default userRouter;
