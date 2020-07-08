const mongoose = require("mongoose");

var OntarioMetaCovidCaseSchema = mongoose.Schema({
    Province: String,
    Total : Number,
    Recovered: Number,
    NotResolved: Number,
    Fatal: Number,
});

module.exports = OntarioMetaCovidCase = mongoose.model("OntarioMetaCovidCase", OntarioMetaCovidCaseSchema)