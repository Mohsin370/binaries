import express, { Express, Request, Response, NextFunction } from "express";
import { sequelize } from "./models";
import routes from "./routes/routes";
import swaggerDocSetup from "./swagger/swagger";

const PORT: string | number = process.env.PORT || 5000;
const app: Express = express();

app.use(express.json({ limit: "50mb" }));
require("dotenv").config();

//setting api headers and defaults
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Content-Type,Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

//swagger setup
swaggerDocSetup(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Test api call works!");
});

app.use("/api", routes);

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});

app.listen(PORT, async () => {
  await sequelize.authenticate().then(() => {
    console.log("Server connected at port: ", PORT);
  });
});
