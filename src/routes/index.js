const { Router } = require("express"),
  routes = Router(),
  usersRouter = require("./users.routes");

routes.use("/users", usersRouter);

module.exports = routes;
