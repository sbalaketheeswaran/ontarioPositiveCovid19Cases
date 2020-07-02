const mongoose = require("mongoose");

//Schema structured off  
//https://data.ontario.ca/dataset/confirmed-positive-cases-of-covid-19-in-ontario/resource/455fd63b-603d-4608-8216-7d8647f43350

const PositiveCovidCaseSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    Row_ID: {
        type: Number,
        required: true,
    },
    Accurate_Episode_Date: Date,
    Case_Reported_Date: Date,
    Test_Reported_Date: Date,
    Specimen_Date: Date,
    Age_Group: String,
    Client_Gender: String,
    Case_AcquisitionInfo: String,
    Outcome1: String,
    Outbreak_Related: String,
    Reporting_PHU: String,
    Reporting_PHU_Address: String,
    Reporting_PHU_City: String,
    Reporting_PHU_Postal_Code: String,
    Reporting_PHU_Website: String,
    Reporting_PHU_Latitude: Number,
    Reporting_PHU_Longitude: Number,
})

module.exports = PositiveCovidCaseEntry =  mongoose.model("PositiveCovidCaseEntry", PositiveCovidCaseSchema)