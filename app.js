const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const user = require("./routes/api/my-routes");
const ira = require("./routes/api/ira-routes");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/todos", user);

app.use("/api/todos/ira", ira);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
