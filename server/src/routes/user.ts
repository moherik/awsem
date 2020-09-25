import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/new", UserController.newUser);

export default router;
