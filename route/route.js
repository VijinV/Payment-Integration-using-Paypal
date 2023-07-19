const express = require('express');
const route = express();

const controller = require('../controller/controller');



route.get('/',controller.loadPage);

route.post('/paypal',controller.paypalPayment);


route.get('/paypalsuccess',(req,res)=>{
    res.send('success');
})


route.get('/paypalcancel',(req,res)=>{
    res.send('failed');
})




module.exports = route;