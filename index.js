const airtableFunctions = require('./airtable/getRecordsFromAirtable')

let testValue = 20;

module.exports = {
    "getAirtableRecords": airtableFunctions.getAirtableRecords,
    testValue
}