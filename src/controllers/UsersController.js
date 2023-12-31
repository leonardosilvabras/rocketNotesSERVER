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

  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name;
    user.email = email;

    await database.run(
      `
     UPDATE users SET
     name = ?,
     email = ?,
     updated_at = ?
     WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    );

    return response.json();
  }
}

module.exports = UsersController;
