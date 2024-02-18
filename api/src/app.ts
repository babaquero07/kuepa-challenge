import express from "express";
import routes from "./app/routes";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

config();

const app = express();

const allowedOrigins = ["http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// MiddleWares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api", routes);

export default app;
