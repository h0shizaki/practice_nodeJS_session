const route = require('express').Router();

route.get('/' , (req,res)=>{
    res.render('index.ejs', {
        title: "Hello world"
    })
})

module.exports = route;