import cors from "cors";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import * as errors from "./middlewares/errors";
import restaurantsRoutes from "./routes/restaurants";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(helmet());

app.get("/api/v1", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/restaurants", restaurantsRoutes);

app.use(errors.notFound);
app.use(errors.errorHandler);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

export default app;
