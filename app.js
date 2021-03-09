require('./config/database')

const express = require("express");
const app = express();

const DataSync = require("./src/service/DataSync")

//Using node-schedule to have a routine data sync job run at 1 am EST daily
const schedule = require('node-schedule');
schedule.scheduleJob('00 6 * * *', DataSync.sync);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Handle Middleware
const cors = require("cors")
app.use(cors());

app.get("", (req,res) =>{
  res.send("Please use either /PublicHealthUnit, or /OntarioMetaCovidCase endpoints")
})


//import routes and assign
const PublicHealthUnit = require('./src/routes/PublicHealthUnit')
app.use("/PublicHealthUnit", PublicHealthUnit);

const OntarioMetaCovidCase = require('./src/routes/OntarioMetaCovidCase')
app.use("/OntarioMetaCovidCase", OntarioMetaCovidCase);

const PORT = process.env.PORT || 3000;

//setup listener
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});