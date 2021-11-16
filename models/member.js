const mongoose = require('mongoose') ;

const memShcema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date: {type: Number, default:Date.now()}
    },
    {
        collection:'mem-list'
    }
)

const model = mongoose.model('Holomem' , memShcema)
module.exports = model ;