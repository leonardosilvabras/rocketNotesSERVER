const req = require("express/lib/request");

const express = require("express"),
  app = express(),
  PORT = 3333;

app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params;

  response.send(`
    ID: ${id},
    User: ${user}.
  `);
});

app.get('/users', (request, response) => {
  const { page, limit } = request.query;

  response.send(`
    Page: ${page},
    Limit: ${limit}.
  `);
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
