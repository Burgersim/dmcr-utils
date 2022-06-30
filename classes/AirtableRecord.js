const cloneDeep = require('lodash.clonedeep');

//define class for Airtable Record Object
export default class AirtableRecord extends Array {
    //constructor
    constructor(metadataSchema, table, view, recordId){
        //console.log(typeof metadataSchema + ": " + metadataSchema)
        //console.log(metadataSchema instanceof Array)
        super();
        if(!(metadataSchema instanceof Array)) {
            console.log("given Parameter is not of type Array")
            throw "given Parameter is not of type Array"
        }
        else{
            //console.log("creating Record Object")
            metadataSchema.forEach(element => this.push(cloneDeep(element)))
        }
        this.table = table;
        this.view = view;
        this.recordId = recordId;
    }

    //get value method | can be used with field Id or field Name
    get(key){
        let result = this.find(field => field.fieldId === key || field.fieldName === key)
        return result ? result.value : false
    }

    getRecordId(){
        return this.recordId
    }

    getTable(){
        return this.table
    }

    getView(){
        return this.view
    }

    //get Id of a field by name
    getFieldId(name){
        name = name.toString()
        let result = this.find(field => field.fieldName === name)
        return result ? result.fieldId : false
    }

    //get every FieldId of the Airtable Record
    getAllIds(){
        let idList = ""
        this.forEach(element => {
            idList += element.fieldName + ": " + element.fieldId + "\n"
        })
        return idList
    }

    //set value method | can be used with field Id or field Name
    set(key, value){
        this.forEach(element => {
            if(element.fieldId === key || element.fieldName === key) {
                element.value = value;
                //return element.fieldName + " | " + element.value;
            }
        })
        //console.log("Key not found")
        //return false;
    }

}

module.exports = AirtableRecord