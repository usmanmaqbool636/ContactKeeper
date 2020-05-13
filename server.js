const express= require('express');
const app= express();
const connectDB= require('./config/db');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


connectDB();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use("/api/user",(require('./routes/users')))
app.use("/api/auth",(require('./routes/auth')))
app.use("/api/contact",(require('./routes/contact')))

app.get("/",(req,res)=>{
    res.json({
        msg:"welcome to contact keeper"
    })
})

app.listen(port,()=>{
    console.log(`server starting on port ${port}`)
})