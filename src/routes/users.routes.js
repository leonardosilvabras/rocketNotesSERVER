const { Router } = require("express"),
  userRoutes = Router(),
  UsersController = require("../controllers/UsersController.js"),
  usersController = new UsersController();

userRoutes.post("/", usersController.create);
userRoutes.put("/:id", usersController.update);

module.exports = userRoutes;
