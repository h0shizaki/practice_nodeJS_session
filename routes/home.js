const route = require('express').Router();
const auth = require('../middlewares/authcheck')

route.get('/' , auth ,(req,res)=>{
    res.render('dashboard.ejs',{
        title:"Logged in successfully"
    });
})

module.exports = route;