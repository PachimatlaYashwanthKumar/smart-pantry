import express from "express";
import cors from "cors";

import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

setupSwagger(app);

app.use("/api/v1", routes);

app.use(errorHandler);

export default app;