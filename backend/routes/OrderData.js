const express = require('express');
const Orders = require('../models/Orders');
const router = express.Router();

router.post('/orderData', async (req, res) => {
    let data = req.body.order_date
    await data.splice(0, 0, { Order_date: req.body.order_date })

    // if email not existing in db tehn create: else: InsertMany()
    let eId = await Orders.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_date: [data]
            }).then(() => {
                res.json({ success: true })
            })
        }
        catch (err) {
            console.log(err.message);
            res.send("Serverr Error", err.message);
        } 
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push: {order_data: data}}).then(()=> {
                    res.json({success: true})
                })
        } catch (err) {
            res.send("Server Error". err.message);
        }
    }

})

router.post('/myorderData', async (req, res) =>{
    try{
        let myData = await Order.findOne({'email':req.body.email});
        res.json({orderData: myData});
    }catch(err){
        res.send("Server Error", err.message)
    }
})

module.exports = router

