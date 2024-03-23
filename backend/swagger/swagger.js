const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

const options = {
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
const swaggerDocSetup = (app) => {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocSetup;
