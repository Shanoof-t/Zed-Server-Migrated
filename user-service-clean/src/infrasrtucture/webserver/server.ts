import express, { Express } from "express";
import cookieParser from "cookie-parser";
import userRouter from "../../interfaces/http/routes/userRoutes";
import globalErrorHanlder from "../../interfaces/http/middlewares/globalErrorHanlder";

async function createServer(): Promise<Express> {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/user", userRouter);
  app.use(globalErrorHanlder);

  return app;
}

export default createServer;
