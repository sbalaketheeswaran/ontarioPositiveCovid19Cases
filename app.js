require('./config/database');
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors")

//import routes and assign
const healthUnitRoute = require('./src/routes/healthUnit')
app.use("/healthUnit", healthUnitRoute);

app.use(bodyParser.json());
//Handle Middleware
app.use(cors());

const PORT = process.env.PORT || 3000;

//setup listener
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});