const route = require('express').Router()

route.get('/login', (req,res)=> {
    res.render('login.ejs',{
        title: 'Login'
    })

})

route.get('/register', (req,res)=> {
    res.render('register.ejs',{
        title: "Register"
    })
})


module.exports = route ;