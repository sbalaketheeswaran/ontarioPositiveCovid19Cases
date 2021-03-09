const axios = require('axios');

//Use pagination to recursively loop through available api database and aggregate all entires
//@param: offset - used to ship all entries <= offset value
//@returns: entire dataset for all available positive covid-19 cases in ontario

//Note: the execution of this function will be greater than 60 seconds to complete
const fetchEntireDataset = async function (offset, IncrementalAdd) {

    const limit = 100; //manage load by limiting the transfer of entries to batches of 100

    const url = `https://data.ontario.ca//api/3/action/datastore_search?offset=${offset}&limit=${limit}&resource_id=455fd63b-603d-4608-8216-7d8647f43350`;
    try {
        const {
            data
        } = await axios.get(url);

        console.log("Retrieving data from API for offset : " + offset);

        if (data.result.records.length > 0) {
            IncrementalAdd(data.result.records)
            return await fetchEntireDataset(offset + 100, IncrementalAdd);
        } else {
            return data.result.records;
        }
    } catch (error) {
        return error;
    }
};

//Dummy query to pull the total number of entires in the external db available through gov-ontario
//returns: total number of positive cases in toronto
const FetchNumberOfEntiresFromExternalApi = async function () {

    const url = "https://data.ontario.ca/api/3/action/datastore_search?resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=0";

    try {
        const {
            data
        } = await axios.get(url);
        return data.result.total;
    } catch (error) {
        return error;
    }
};

exports.fetchEntireDataset = fetchEntireDataset;
exports.FetchNumberOfEntiresFromExternalApi = FetchNumberOfEntiresFromExternalApi;