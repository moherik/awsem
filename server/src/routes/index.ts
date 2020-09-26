import { Router, Request, Response } from "express";

import AuthRoutes from "./auth";
import UserRoutes from "./user";

const routes = Router();

routes.get("/", (_req: Request, res: Response) => {
  res.send("welcome to awsem api");
});

routes.use("/auth", AuthRoutes);
routes.use("/users", UserRoutes);

export default routes;
