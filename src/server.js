const req = require("express/lib/request");

const express = require("express"),
  app = express(),
  PORT = 3333;

app.use(express.json());

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  res.json({ name, email, password });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
