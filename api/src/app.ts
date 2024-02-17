import express from "express";
import routes from "./app/routes";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

config();

const app = express();

const allowedOrigins = [];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// MiddleWares
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", routes);

export default app;
