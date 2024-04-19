const express = require('express');
const router = express.Router();
const data = require('../db')

router.post('/foodData', (req, res)=>{
    try{
        // console.log(global.foodItem)
        res.send([global.foodData, global.catData]);

    } catch(err){
        console.log(err)
        res.send("server error");

    }
})

module.exports = router;