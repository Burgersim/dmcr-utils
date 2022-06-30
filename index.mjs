import getRecordsFromAirtable from './airtable/getRecordsFromAirtable'

const {getAirtableRecords} = getRecordsFromAirtable

let testValue = 20;

module.exports = {
    getAirtableRecords,
    testValue
}