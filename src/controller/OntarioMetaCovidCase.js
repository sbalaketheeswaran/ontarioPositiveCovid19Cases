const mongoose = require("mongoose");
const OntarioMetaCovidCase = require("../models/OntarioMetaCovidCase")
const DataSynchronizedLog = require("../models/DataSynchronizedLog")

exports.ontarioMetaCovidCase_get = async (req, res) => {
    let lastSynchedDate = await DataSynchronizedLog.getLastSyncDate()
    OntarioMetaCovidCase.find()
        .then(entries => {
            const response = {
                lastSynced: lastSynchedDate,
                count: entries.length,
                result: entries.map(entry => {
                    return {
                        Province: entry.Province,
                        Total: entry.Total,
                        Recovered: entry.Recovered,
                        NotResolved: entry.NotResolved,
                        Fatal: entry.Fatal,
                    };
                })
            };
            if (entries.length >= 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'No Ontario meta covid case information found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};