const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtKey = "atulkumarfullstackapp"

router.post('/createuser', [ body("email").isEmail(),
body("password", "incorrect password").isLength({min:5}),
body("name").isLength({min:5})], async (req, res) => {
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try{
        console.log(req.body);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            location: req.body.location
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
        const pwdCompare = await bcrypt.compare( req.body.password, userData.password)
        if(!pwdCompare){
            return res.status(400).json({errors: "Try logging in with correct credentials" });
        }

        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data, jwtKey)
        return res.json({success: true, authToken});
    } catch(err){
        console.log(err);
        res.json({success: false});
    }
})

module.exports = router
