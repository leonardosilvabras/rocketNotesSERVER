const AppError = require("../utils/AppError.js"),
  sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body,
      database = await sqliteConnection(),
      checkUserExists = await database.get(
        "SELECT * FROM users WHERE email = (?)",
        [email]
      );

      if(checkUserExists) {
        throw new AppError("Esse email ja esta em uso", 400);
      }

      return res.status(201).json()
  }
}

module.exports = UsersController;
