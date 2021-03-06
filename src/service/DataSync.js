const mongoose = require("mongoose");
const PositiveCovidCase = require("../models/PositiveCovidCase")
const PublicHealthUnit = require("../models/PublicHealthUnit")
const OntarioMetaCovidCase = require("../models/OntarioMetaCovidCase")
const DataSynchronizationLog = require("../models/DataSynchronizedLog")
const api = require("../api")

const dropPreviousCollections = async (collectionName) => {
    //drop specified collection
    let result = await mongoose.connection.dropCollection(collectionName, (error, message) => {
        if (error) {
            console.log(`Encountered error with dropping collection ${collectionName}: ${error}`)
            return {
                result: error
            }
        } else {
            console.log(`Successfully dropped collection ${collectionName}: ${message}`)
            return {
                result: message
            }
        }
    });

    return result;
}

function IncrementalAdd(entryTable){

    entryTable.map(record => {
        let positiveCovidCaseEntry = new PositiveCovidCase({
            _id: record._id,
            Row_ID: record.Row_ID,
            Accurate_Episode_Date: record.Accurate_Episode_Date,
            Case_Reported_Date: record.Case_Reported_Date,
            Test_Reported_Date: record.Test_Reported_Date,
            Specimen_Date: record.Specimen_Date,
            Age_Group: record.Age_Group,
            Client_Gender: record.Client_Gender,
            Case_AcquisitionInfo: record.Case_AcquisitionInfo,
            Outcome1: record.Outcome1,
            Outbreak_Related: record.Outbreak_Related,
            Reporting_PHU: record.Reporting_PHU,
            Reporting_PHU_Address: record.Reporting_PHU_Address,
            Reporting_PHU_City: record.Reporting_PHU_City,
            Reporting_PHU_Postal_Code: record.Reporting_PHU_Postal_Code,
            Reporting_PHU_Website: record.Reporting_PHU_Website,
            Reporting_PHU_Latitude: record.Reporting_PHU_Latitude,
            Reporting_PHU_Longitude: record.Reporting_PHU_Longitude,
        });
        try {
            positiveCovidCaseEntry.save();
        } catch (error) {
            console.log("Failed to save entry at: " + positiveCovidCaseEntry._id)
        }
    });
}

const syncWithExternalData = async () => {
    //pull dataset from external api
    const offset = 0;
    let positiveCovidCases = await api.fetchEntireDataset(offset, IncrementalAdd);

    IncrementalAdd(positiveCovidCases);

    let numberOfStoredEntries = await PositiveCovidCase.countDocuments({}, (err, numberOfStoredEntries) => {
        return numberOfStoredEntries
    })

    return {
        result: numberOfStoredEntries
    }
}

const populatePublicHealthUnitCollection = async () => {
    let distinctEntries = await PositiveCovidCase.distinct('Reporting_PHU', (err, result) => {
        if (err) {
            console.log(err)
            return {
                result: err
            }
        }
        if (result) {
            return result;
        }
    })
    console.log(distinctEntries)
    distinctEntries.map(async (publicHealthUnit) => {
        let source = await PositiveCovidCase.findOne({
            "Reporting_PHU": publicHealthUnit
        }, function (err, publicHealthUnitFields) {
            return publicHealthUnitFields
        });

        let recovered = await PositiveCovidCase.countDocuments({
            "Reporting_PHU": publicHealthUnit,
            "Outcome1": "Resolved"
        }, (err, resolved) => {
            return resolved
        })

        let notResolved = await PositiveCovidCase.countDocuments({
            "Reporting_PHU": publicHealthUnit,
            "Outcome1": "Not Resolved"
        }, (err, notResolved) => {
            return notResolved
        })

        let fatal = await PositiveCovidCase.countDocuments({
            "Reporting_PHU": publicHealthUnit,
            "Outcome1": "Fatal"
        }, (err, fatal) => {
            return fatal
        });

        let publicHealthUnitEntry = new PublicHealthUnit({
            _id: new mongoose.Types.ObjectId(),
            Outcome: {
                Total: (recovered + notResolved + fatal),
                Recovered: recovered,
                NotResolved: notResolved,
                Fatal: fatal
            },
            PublicHealthUnit: source.Reporting_PHU,
            City: source.Reporting_PHU_City,
            Latitude: source.Reporting_PHU_Latitude,
            Longitude: source.Reporting_PHU_Longitude
        })

        try {
            publicHealthUnitEntry.save();
        } catch (error) {
            console.log("Failed to save entry at: " + publicHealthUnitEntry._id)
        }
    });

    return {
        result: "success"
    }
};

const populateOntarioMetaCollection = async () => {
    let recovered = await PositiveCovidCase.countDocuments({
        "Outcome1": "Resolved"
    }, (err, resolved) => {
        return resolved
    });

    let notResolved = await PositiveCovidCase.countDocuments({
        "Outcome1": "Not Resolved"
    }, (err, notResolved) => {
        return notResolved
    });

    let fatal = await PositiveCovidCase.countDocuments({
        "Outcome1": "Fatal"
    }, (err, fatal) => {
        return fatal
    });

    let OntarioMetaCovidCaseEntry = new OntarioMetaCovidCase({
        Province: "Ontario",
        Recovered: recovered,
        NotResolved: notResolved,
        Fatal: fatal,
        Total : recovered + notResolved + fatal
    })

    try {
        OntarioMetaCovidCaseEntry.save();
    } catch (error) {
        console.log("Failed to save entry at: " + OntarioMetaCovidCaseEntry.Province)
    }
};

const appendToDataSyncLog = async () => {
    let date = Date.now();
    let dataSynchronizationLog = new DataSynchronizationLog({
        SyncTime: date
    })
    
    dataSynchronizationLog.save();
}

exports.sync = async () => {
    await dropPreviousCollections('positivecovidcases');
    await syncWithExternalData();
    await dropPreviousCollections('publichealthunits');
    await populatePublicHealthUnitCollection();
    await dropPreviousCollections('ontariometacovidcases');
    await populateOntarioMetaCollection();
    await appendToDataSyncLog();
};