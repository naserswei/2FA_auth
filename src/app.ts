import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import testroute from "./routes/auth";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "naserswei",
  });
});

app.use("/test", testroute);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
