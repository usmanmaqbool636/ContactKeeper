const express= require('express');
const app= express();
const port = process.env.PORT || 5000


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