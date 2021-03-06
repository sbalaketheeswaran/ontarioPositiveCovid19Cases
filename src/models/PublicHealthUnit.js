const mongoose = require("mongoose");

var PublicHealthUnitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Outcome: {
        Total: Number,
        Recovered: Number,
        NotResolved: Number,
        Fatal: Number
    },
    PublicHealthUnit: String,
    City: String,
    Latitude: Number,
    Longitude: Number
});

module.exports = PublicHealthUnit = mongoose.model("PublicHealthUnit", PublicHealthUnitSchema)