const swaggerUi = require("swagger-ui-express");
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import { Express } from "express";
require("dotenv").config();

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation for Binaries",
      version: "1.0.0",
    },
    servers: [{ url: `${process.env.BACKEND_URL}` }],
  },
  apis: ["./routes/routes.js"],
};

const swaggerSpec = swaggerJsDoc(options);

//swagger setup initialization
const swaggerDocSetup = (app: Express) => {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


export default swaggerDocSetup;
