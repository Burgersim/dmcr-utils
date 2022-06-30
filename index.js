const getAirtableRecords = require('./airtable/getRecordsFromAirtable')

let testValue = 20;

module.exports = {
    "getAirtableRecords": getAirtableRecords.getAirtableRecords,
    testValue
}