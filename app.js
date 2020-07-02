require('./config/database');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();

app.use(bodyParser.json());
//Handle Middleware
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});