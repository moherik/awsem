import { createConnection } from "typeorm";
import { Logger } from "tslog";

import app from "./app";

const PORT = process.env.PORT || 4000;
const log: Logger = new Logger();

const server = async () => {
  await createConnection()
    .then(() => log.debug(">.< Connection established"))
    .catch((err) => log.error(">.< Database connection error", err));

  app.listen(PORT, () => log.debug(`>.< Server running on port ${PORT}`));
};

server();
