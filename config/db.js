const mongoose = require('mongoose');
const config = require('config');

const devdb = config.get('devMongoURI')
const db = config.get('MongoURI')


var DB;
var text;
if (process.env.NODE_ENV === "production ") {
    DB = db;
    text = "production"
}
else {
    DB = devdb;
    text = "development"
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        console.log(`mongoose connected to ${text}`)
    }
    catch (e) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;