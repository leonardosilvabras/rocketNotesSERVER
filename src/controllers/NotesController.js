const knex = require("../database/knex");

class NotesController {
  async create(req, res) {
    const { title, description, tags, link } = req.body;
    const { user_id } = req.params;

    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);

    response.json()
  }
}

module.exports = NotesController();
