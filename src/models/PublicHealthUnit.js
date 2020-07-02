const mongoose = require("mongoose")

var PublicHealthUnitSchema = mongoose.Schema({
    Outcome: {
        Recovered: Number,
        NotResolved: Number,
        Fatal: Number
    },
    PublicHealthUnit: String,
    City: String,
    Latitude: Number,
    Longitude: Number,
})

model.exports = PublicHealthUnit = mongoose.model("PublicHealthUnit", PublicHealthUnitSchema)