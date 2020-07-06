require('./config/database')

const express = require("express");
const app = express();

const DataSync = require("./src/service/DataSync")

DataSync.sync();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Handle Middleware
const cors = require("cors")
app.use(cors());

//import routes and assign
const PublicHealthUnit = require('./src/routes/PublicHealthUnit')
app.use("/PublicHealthUnit", PublicHealthUnit);

const PORT = process.env.PORT || 3000;

//setup listener
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});