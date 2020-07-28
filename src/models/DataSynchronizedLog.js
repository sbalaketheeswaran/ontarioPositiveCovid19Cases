const mongoose = require("mongoose");

var DataSynchronizedLogSchema = mongoose.Schema({
    SyncTime: Number //store unix epoch based time (convert using Data ctor to account of localization)
});

module.exports = DataSynchronizedLog = mongoose.model("DataSynchronizedLog", DataSynchronizedLogSchema)