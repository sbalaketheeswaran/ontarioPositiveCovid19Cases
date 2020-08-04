const mongoose = require("mongoose");

var DataSynchronizedLogSchema = mongoose.Schema({
    SyncTime: Number //store unix epoch based time (convert using Data ctor to account of localization)
});

const getLastSyncDate = async function (){
    let lastSyncDate = await DataSynchronizedLog.find({}).sort({SyncTime: 'descending'}).limit(1).then((date) => {
        if (!date) {
            return new Error('Error querying DataSynchronizedLog for last synced date');
        }
        if (date) {
            return new Date(date[0].SyncTime);
        }
    })

    return lastSyncDate;
}

module.exports = DataSynchronizedLog = mongoose.model("DataSynchronizedLog", DataSynchronizedLogSchema)
module.exports.getLastSyncDate = getLastSyncDate;