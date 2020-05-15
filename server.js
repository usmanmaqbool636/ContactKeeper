const express= require('express');
const app= express();
const connectDB= require('./config/db');
const bodyParser = require('body-parser');
const cors= require("cors");
const port = process.env.PORT || 5000;


connectDB();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use("/api/user",(require('./routes/users')))
app.use("/api/auth",(require('./routes/auth')))
app.use("/api/contact",(require('./routes/contact')))


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})