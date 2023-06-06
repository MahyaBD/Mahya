const db = require("./database");

var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
  name: String,
  age: String,
  mobile: String,
  bloodGroup: String,
  date: String,
  username: String,
  caseID: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
});

//User is a model which has a schema userSchema
module.exports = new mongoose.model("Appointment", appointmentSchema);
