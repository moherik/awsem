import express from "express";
import routes from "./routes";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import { initPassport } from "./config/passport";
import passport from "passport";

initPassport();

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/", routes);

export default app;
