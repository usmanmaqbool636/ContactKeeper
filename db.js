const mongoose = require('mongoose');
var DB;
var text;
if (process.env.NODE_ENVV === "prod") {
    DB = process.env.PROD_MONGOURI;
    text = "production"
}
else {
    DB = process.env.DEV_MONGOURI;
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
        console.log("connected to ",text)
        console.log(process.env.NODE_ENVV)
    }
    catch (e) {
        process.exit(1);
    }
}

module.exports = connectDB;