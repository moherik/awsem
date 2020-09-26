import * as dotenv from "dotenv";
dotenv.config();

import { createConnection } from "typeorm";
// import { Logger } from "tslog";

import app from "./app";

const PORT = process.env.PORT || 4000;
// const log: Logger = new Logger();

const server = async () => {
  await createConnection()
    .then(() => console.log(">.< Connection established"))
    .catch((err) => console.error(">.< Database connection error", err));

  app.listen(PORT, () => console.log(`>.< Server running on port ${PORT}`));
};

server();
