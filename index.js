const airtableFunctions = require('./airtable/getRecordsFromAirtable.mjs')

let testValue = 20;

module.exports = {
    "getAirtableRecords": airtableFunctions.getAirtableRecords,
    testValue
}