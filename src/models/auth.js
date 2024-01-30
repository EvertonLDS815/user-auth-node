const {Schema, model} = require('mongoose');


const User = model('User', new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}));

module.exports = User;