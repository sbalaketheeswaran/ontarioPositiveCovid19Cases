const mongoose = require("mongoose");
const PublicHealthUnit = require("../models/PublicHealthUnit")

exports.publicHealthUnits_get_all = (req, res) => {
    PublicHealthUnit.find()
        .then(entries => {
            const response = {
                count: entries.length,
                result: entries.map(entry => {
                    return {
                        id: entry.ObjectId,
                        Outcome: {
                            Recovered: entry.Outcome.Recovered,
                            NotResolved: entry.Outcome.NotResolved,
                            Fatal: entry.Outcome.Fatal
                        },
                        PublicHealthUnit: entry.PublicHealthUnit,
                        City: entry.City,
                        Latitude: entry.Latitude,
                        Longitude: entry.Longitude,
                    };
                })
            };

            if (entries.length >= 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'No entries found'
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

exports.publicHealthUnit_get_by_id = (req, res) => {
    const id = req.params.productId;
    PublicHealthUnit.findById(id)
        .then(entry => {
            if (entry) {
                res.status(200).json({
                    publicHealthUnit: entry,
                });
            } else {
                res
                    .status(404)
                    .json({
                        message: "No entry found for requested ID"
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