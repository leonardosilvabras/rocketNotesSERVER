const express = require("express"),
  app = express(),
  PORT = 3333;

app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params;

  response.send(`
    ID Message: ${id},
    for User: ${user}.
  `);
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
