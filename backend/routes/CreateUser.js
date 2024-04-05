const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')


router.post('/createuser', [ body("email").isEmail(),
body("password", "incorrect password").isLength({min:5}),
body("name").isLength({min:5})], async (req, res) => {
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try{
        console.log(req.body);
        await User.create({
            name: "dfsd",
            email: "g@gmail.com",
            password: "klfjsa",
            location: "lsdjfs"
        }).then(res.json({success: true}));
        console.log("success: true")
    } catch(err){
        console.log(err);
        res.json({success: false});
    }
})

router.post('/login',  [ body("email").isEmail(),
body("password", "incorrect password").isLength({min:5}),
body("name").isLength({min:5})], async (req, res) => {
    let email = req.body.email
    try{
        // console.log(req.body);
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Try logging in with correct credentials" });            
        }
        
        if(req.body.password!==userData.password){
            return res.status(400).json({errors: "Try logging in with correct credentials" });
        }
        return res.json({success: true });
    } catch(err){
        console.log(err);
        res.json({success: false});
    }
})

module.exports = router
