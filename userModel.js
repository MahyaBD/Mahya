const db = require("./database");
 
var mongoose = require('mongoose');
 
var userSchema = new mongoose.Schema({
    email: String,
    password: String,
});
 
//User is a model which has a schema userSchema
module.exports = new mongoose.model('User', userSchema);
