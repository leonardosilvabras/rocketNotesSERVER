const AppError = require("../utils/AppError.js"),
  sqliteConnection = require("../database/sqlite"),
  { hash } = require("bcryptjs");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body,
      database = await sqliteConnection(),
      hashedPassword = await hash(password, 8),
      checkUserExists = await database.get(
        "SELECT * FROM users WHERE email = (?)",
        [email]
      );

    if (checkUserExists) {
      throw new AppError("Esse email ja esta em uso", 400);
    }

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email } = req.body,
      { id } = req.params,
      database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    if (!user) throw new AppError("Usuario nao encontrado");

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id)
      throw new AppError("Este email ja esta em uso");

    user.name = name;
    user.email = email;

    await database.run(`
      UPDATE users SET
      name = ?, 
      email = ?, 
      updated_at = ?, 
      id = ?`,
      [user.name, user.email, new Date(), id]
    );

    return res.status(200).json();
  }
}

module.exports = UsersController;
