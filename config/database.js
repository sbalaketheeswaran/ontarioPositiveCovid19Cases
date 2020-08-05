const mongoose = require("mongoose");
require('dotenv/config')

class Connection {
    constructor() {
        const url =
            process.env.MONGODB_URI || `mongodb://localhost:27017/covid-19-ontario-cases`;
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useUnifiedTopology", true);
        mongoose.connect(url)
                .then(console.log(`connected to DB: ${url}`));
    }
}

exports.module = new Connection();