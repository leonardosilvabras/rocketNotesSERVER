const { Router } = require("express"),
  userRoutes = Router(),
  UsersController = require("../controllers/UsersController.js"),
  usersController = new UsersController();

userRoutes.post("/", usersController.create);

module.exports = userRoutes;
