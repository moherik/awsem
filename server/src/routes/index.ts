import { Router } from "express";

import AuthRoutes from "./auth";
import UserRoutes from "./user";

const routes = Router();

routes.use("/auth", AuthRoutes);
routes.use("/users", UserRoutes);

export default routes;
