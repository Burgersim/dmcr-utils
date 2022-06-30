# dmcr-utils
Utility Library containing useful functions for quick development of DMCR-related Tools and Services

## Functions

###getAirtableRecords

Fetches records from Airtable using apiKey, baseId, table and view as parameters. Records are fetched using the AirtableRecord class (extending Array).

#### Airtable Record Methods
    get(value): returns the value of the given field (using id or name)
    getRecordId: returns Id of the Airtable Record
    getTable: returns Id of the Table containing the Record
    getView: returns Id of the View the record was taken from
    getFieldId(value): returns Id of a field (using name)
    getAllIds: returns all field Ids of the Record
    set(key, value): sets the value of the given field (using id or name)
