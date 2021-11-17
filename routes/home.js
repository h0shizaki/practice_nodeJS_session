const route = require('express').Router();
const auth = require('../middlewares/authcheck');
const MemberModel = require('../models/member');

route.get('/' , auth ,(req,res)=>{
    res.render('dashboard.ejs',{
        title:"Logged in successfully"
    });
})

route.get('/log', auth , (req,res)=>{
    res.send(req.session)
})

route.get('/info', auth, async(req,res)=>{
    const userInfo = await MemberModel.findOne({"_id": req.session.user_id})
    res.send(userInfo);
})

module.exports = route;