const db = require("./database");
 
var mongoose = require('mongoose');
 
var appSchema = new mongoose.Schema({
    name: String,
    age: String,
    mobile: String,
    bloodGroup: String,
    date: String,
    userName: String
});
 
//Case is a model which has a schema appSchema
module.exports = new mongoose.model('Appointment', appSchema);
