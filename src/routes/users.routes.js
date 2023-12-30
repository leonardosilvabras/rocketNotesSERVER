const { Router } = require("express"),
  userRoutes = Router(),
  UsersController = require('../../controllers/UsersController.js'),
  usersController = new UsersController();

function MyMiddleware(req, res, next) {
  console.log('middleware')

  next()
} 

userRoutes.post("/", MyMiddleware, usersController.create);

module.exports = userRoutes;
