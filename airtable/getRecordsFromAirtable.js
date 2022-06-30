import Airtable from "airtable";
import AirtableRecord from "../classes/AirtableRecord";
const axios = require('axios');

export function getAirtableRecords(apiKey, baseId, table, view){
    const Base = new Airtable({apiKey: apiKey}).base(baseId);

    return new Promise(async function (resolve, reject) {

        let recordArray = [];
        let schemaArray = [];

        //query meta Airtable API
        let config = {
            method: 'get',
            url: 'https://api.airtable.com/v0/meta/bases/' + baseId + '/tables',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Cookie': 'brw=brw9o0V75aXrqjgEK'
            }
        };

        await axios(config)
            .then((response) => {
                //get only queried table
                for(let i = 0; i < response.data.tables.length; i++){
                    if(response.data.tables[i]['name'] === table || response.data.tables[i]['id'] === table) {
                        //console.log(JSON.stringify(response.data.tables[i], null, 4))
                        //put metadata into metadataArray
                        for(let j = 0; j < response.data.tables[i].fields.length; j++){
                            schemaArray.push({
                                "fieldId": response.data.tables[i].fields[j].id,
                                "fieldName": response.data.tables[i].fields[j].name,
                                "fieldType": response.data.tables[i].fields[j].type,
                                "value": ""
                            })
                        }
                    }
                }

                //console.log("schemaArray at Pos 1: " + JSON.stringify(schemaArray[1]))
                Base(table).select({view: view}).eachPage(function page(records, fetchNextPage) {


                    records.forEach(function (record) {

                        let nextArrayEntry = new AirtableRecord(schemaArray, table, view, record.getId())
                        //let nextArrayEntry = {}
                        //console.log("Next Entry at Pos 1: " + JSON.stringify(nextArrayEntry[1], null, 2))

                        //console.log(record.fields)

                        //console.log("Field at Pos 1: " + record.fields[1])

                        for(let fieldName in record.fields) {
                            if(record.fields.hasOwnProperty(fieldName)){
                                //if(fieldName === 'Eventname') {
                                //    console.log(fieldName + ": " + record.fields[fieldName])
                                //}
                                nextArrayEntry.set(fieldName, record.fields[fieldName])
                            }
                        }
                        //console.log("Next Array Entry Name: " + nextArrayEntry.get('Eventname') + ": " + nextArrayEntry.getRecordId())
                        recordArray.push(nextArrayEntry)

                    });

                    // To fetch the next page of records, call `fetchNextPage`.
                    // If there are more records, `page` will get called again.
                    // If there are no more records, `done` will get called.
                    try {
                        fetchNextPage();
                    } catch {
                        console.log("catched")
                    }

                }, function done(err) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    //console.log("Result Array Length: " + stvResultArray.length)
                    //console.log("Result Array: " + '\n' + stvResultArray);
                    //console.log("Result Array at Pos 1: " + recordArray[1].get('Eventname') + ": " + recordArray[1].getRecordId())
                    //console.log("Result Array at Pos 2: " + recordArray[2].get('Eventname') + ": " + recordArray[2].getRecordId())
                    //console.log("Result Array at Pos 3: " + recordArray[3].get('Eventname') + ": " + recordArray[3].getRecordId())
                    resolve(recordArray);
                });

                //console.log(JSON.stringify(response.data, null, 4));
            })
            .catch((error) => {
                console.log(error);
            });



    })
}