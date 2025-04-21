const mongoose = require('mongoose')
const config = require('../config/db')

const UserSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    login: {type: String, required: true},
    password: {type: String, required: true}
})


const User = module.exports = mongoose.model("User", UserSchema)

module.exports.getAllUsers = async function(){
    return await User.find()
}

module.exports.getUserByLogin = async function(login, callback){
    const query = {login: login};
    return await User.findOne(query, callback);
}

module.exports.getUserById = async function(id, callback){
    return await User.findById(id, callback);
}

module.exports.addUser = async function(newUser) {
    try {
        return await newUser.save();
    } catch (err) {
        throw err;
    }
};