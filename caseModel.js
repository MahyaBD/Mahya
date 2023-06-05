const db = require("./database");
 
var mongoose = require('mongoose');
 
var caseSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    fileNumber: String,
    description: String,
    bloodGroup: String,
    hospital: String,
    userName: String
});
 
//Case is a model which has a schema caseSchema
module.exports = new mongoose.model('Case', caseSchema);
