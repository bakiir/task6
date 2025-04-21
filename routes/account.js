const express = require('express')
const router = express.Router()
const User = require('../models/user');
const {path} = require("express/lib/application");
const {login} = require("passport/lib/http/request");


router.get('/', async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json( users);
    } catch (err) {
        res.status(500).json({ success: false, msg: "Error getting users" });
    }
});
router.post('/reg', async (req, res)=>{
    const newUser = new User ({
        name: req.body.name,
        email:req.body.email,
        login:req.body.login,
        password:req.body.password
    })

    try{
        const user = await User.addUser(newUser);
        res.json({succes: true, msg: user})
    }catch(err){
        res.status(200).json({succes: false, msg: "Failed to add user"})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating user' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted', user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during deletion' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating user' });
    }
});


module.exports = router