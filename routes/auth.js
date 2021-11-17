const route = require('express').Router();
const MemberModel = require('../models/member');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/authcheck')

route.get('/register', (req,res)=> {
    res.render('register.ejs',{
        title: "Register"
    })
})

route.post('/register', async(req,res)=> {
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password , salt);

    const data = {
        'username' : req.body.username ,
        'password' : hashedPass
    }

    try{
        await MemberModel.create(data);
        res.redirect('/index')
    }catch(error){
        res.status(400).send(error);
    }


});

route.get('/login', (req,res)=> {
    res.render('login.ejs',{
        title: 'Login'
    })
})

route.post('/login', async(req,res)=>{
    try{
        const user = await MemberModel.findOne({'username' : req.body.username})
        if(!user) return res.status(400).send({message:"Username not found "});

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send({message:"Password is incorrect "});

        //pass validation 
        req.session.isAuth = true
        res.redirect('/home')
    }
    catch(error){
        res.status(400).send(error);
    }
})

route.get('/logout', auth,(req,res)=>{
    req.session.destroy( (error)=>{
        if(error){
            res.send(error).status(501)
        }
    })

    res.redirect('/index')
})


module.exports = route ;