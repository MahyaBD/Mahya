var mongoose = require('mongoose');

const uri = "mongodb+srv://MahyaBDW:MahyaBDWebsite@cluster0.l8hmdjz.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;
