const { planets } = require("./models/data");
const express = require("express");
const cors = require("cors");
const path = require("path");
const planetRouter = require("./routes/planet.router");
const app = express();
const PORT = 3000;

const jsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Planets api",
      description: "Planets api",
      contact: {
        name: "Lynoma.github.io",
      },
      servers: ["https://localhost:3000"],
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = jsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * @swagger
 * /planets:
 *  get:
 *      description: Return list of planets
 *  post:
 *      description: Add a planet to the list
 * 
 * /planets/{id}:
 *  get:
 *      description: Return planet with corresponding id
 *  put:
 *      description: update planet with corresponding id
 *  delete:
 *      description: delete planet with corresponding id
 * 
 * /planets/color/{color}: 
 *  get:
 *      description: Return all planets with corresponding color
 * 
 * /planets/size/{size}:
 *  get:
 *      description: return all planets below this size
 *  
*/
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use((req, res, next) => {
  const datenow = Date.now();
  next();
  const dateafter = Date.now();
  const delta = dateafter - datenow;
  console.log(`Response time ${delta}ms`);
});

app.get("/", (req, res) => {
  res.send("Welcome to my web server");
});

app.get("/messages", (req, res) => {
  res.send("<h1>Messages</h1><ul><li>Hello 1</li><li>Hello 2</li></ul>");
});

app.use("/planets", planetRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
