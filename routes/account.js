const express = require('express')
const router = express.Router()
const User = require('../models/user');


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

module.exports = router