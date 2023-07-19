const express = require('express');
const route = express();

const controller = require('../controller/controller');



route.get('/',controller.loadPage);

route.post('/paypal',controller.paypalPayment);


route.get('/paypalsuccess',(req,res)=>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const executePayment = {
      payer_id: payerId,
    };
  
    paypal.payment.execute(paymentId, executePayment, (error, payment) => {
      if (error) {
        console.error('Error executing PayPal payment:', error);
        res.redirect('/paypalcancel');
      } else {
        
        res.send('Payment Success'); 
      }
    });
})


route.get('/paypalcancel',(req,res)=>{
    res.send('failed');
})




module.exports = route;