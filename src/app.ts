import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authroute from "./routes/auth";
import passport from "passport";
import session from "express-session";
import "./lib/passport";

import cors from "cors";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authroute);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
