require("express-async-errors");

const express = require("express"),
  routes = require("./routes"),
  app = express(),
  PORT = 3333,
  AppError = require("./utils/AppError.js"),
  migrationsRUN = require("./database/sqlite/migrations");

migrationsRUN();

app.use(express.json());
app.use(routes);

app.use((e, req, res, next) => {
  console.error(e);

  if (e instanceof AppError)
    return res.status(e.statusCode).json({
      status: "error",
      message: e.message,
    });

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
