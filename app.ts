import http from "http";
import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import dotenv from "dotenv";
import { NotFoundError } from "errors";
import { errorHandler } from "middleware";
import {
  AuthRouter,
  //  PublicRouter,
  PrivateRouter,
} from "router";
import { verifyUser } from "middleware/verify-user";
import cors from "cors";

import path from "path";

// import { UploadsRouter } from "lib/uploads-service/uploads-service.router";
// import { io } from "config/socket";
// import * as HyperDX from "@hyperdx/node-opentelemetry";
import { configs } from "config/app.config";
import { swaggerDocs } from "utils/swagger";
import { engine } from "express-handlebars";

const app = express();
const server = http.createServer(app);

// HyperDX.init({
//   apiKey: configs.HYPERDX,
//   service: "main-backend-service",
//   consoleCapture: false,
// });

// HyperDX.setupExpressErrorHandler(app);

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    file: any;
    files: any;
  }
}

// io.attach(server, { cors: { origin: "*" } });

app.set("trust proxy", true);
// app.set("socketio", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));
app.engine(
  "handlebars",
  engine({
    defaultLayout: false,
    extname: ".handlebars",
    layoutsDir: path.join(__dirname, "./views"),
    partialsDir: path.join(__dirname, "./views"),
  })
);

app.use(compression());
// app.use("/images", express.static(path.join(__dirname, "/assets/images")));
dotenv.config();

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the carptur backend service",
  });
});

app.use(cors());
swaggerDocs(app, Number(process.env.PORT) || 5000);
app.use("/api/v1/auth", AuthRouter);
// app.use("/api/v1/file", UploadsRouter);

app.use("/api/v1/", verifyUser, PrivateRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Route not found"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  errorHandler(err, req, res, next);
});

export { server, app };
