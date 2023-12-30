const express = require("express"),
  routes = require("./routes"),
  app = express(),
  PORT = 3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
