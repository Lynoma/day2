const express = require("express");
const cors = require("cors");
const studentRouter = require("./routes/student.router");
const app = express();
const PORT = 3000;

const jsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student api",
      description: "Student api",
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

app.use("/students", studentRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
