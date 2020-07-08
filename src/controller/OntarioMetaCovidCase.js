const mongoose = require("mongoose");
const OntarioMetaCovidCase = require("../models/OntarioMetaCovidCase")

exports.ontarioMetaCovidCase_get = (req, res) => {
    OntarioMetaCovidCase.find()
        .then(entries => {
            const response = {
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