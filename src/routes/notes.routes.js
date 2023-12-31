const { Router } = require("express"),
  notesRoutes = Router(),
  NotesController = require("../controllers/NotesController.js"),
  NotesController = new NotesController();

notesRoutes.post("/", NotesController.create);

module.exports = notesRoutes;
