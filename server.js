const express = require('express');
const app = express() ;
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const path = require('path')
const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/mydb"

//Connect to DB
mongoose.connect(mongoURI);

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySession'
})

//set middleware
app.use(session({
    secret: 'Kawmankai',
    resave: false,
    saveUninitialized: false ,
    store: store
}))

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//setting view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//import route
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth')


//test session
app.get("/" , (req,res)=>{
    req.session.isAuth = true;
    res.send(req.session)
})

app.get("/logout" , (req,res)=>{
    req.session.isAuth = false;
    res.send(req.session)
})

app.get("/secret" , (req,res)=>{
    if(!req.session.isAuth) return res.status(301).send("Please login")

    res.send({Secret:"My friend's watch is here"});
})






app.use('/index', indexRoute);
app.use('/auth', authRoute);

const PORT = process.env.PORT || 8080 ;
app.listen(PORT, ()=>console.log(`Server is running on Port : ${PORT}`))