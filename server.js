const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport');


// import users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");



//DB config
const db = require("./config/key").mongoURI;


//user body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




//Connect
mongoose.connect(db,{useNewUrlParser:true})
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
 
 //passport 初始化
app.use(passport.initialize());


require("./config/passport")(passport)


// app.get("/",(req,res) => {
//    res.send("hello world!")
// })

//routers
app.use("/api/users/",users);
app.use("/api/profiles/",profiles);


const port = process.env.PORT || 5000;

app.listen(port,() =>{
    console.log(`Server running on port ${port}`);
} )

