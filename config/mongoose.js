const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/paint_app_db');
const db = mongoose.connection;

db.on('error', console.error.bind(console.log("ERROR while connecting to mongodb")));
db.once('open', function () {
    console.log("Database is connected successfully");
});