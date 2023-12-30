const express = require('express'),
app = express(),
PORT = 3333

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))