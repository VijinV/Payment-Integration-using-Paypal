const paypal = require('../config/paypal');


const paypalPayment = async (req, res) => {

    try {

        //items for payment

        const image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"

        const items = [{
            "name": "Product1", //product name
            "sku": '001', //unique identifier for product (you can use _id from database)
            "price": '1', //price
            "currency": "USD", //currency
            "quantity": 1, //quantity
            "url": image //image url if available (optional)
        }, {
            "name": "Product1",
            "sku": '001',
            "price": '1',
            "currency": "USD",
            "quantity": 1,
            "url": image
        }

        ]

        const amount = {
            "currency": "USD", //currency
            "total": "2" //total amount
        }

        // Creating a payment data object

        const paymentData = {

            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8080/paypalsuccess", // if sucessfull return url
                "cancel_url": "http://localhost:8080/paypalcancel" // if canceled return url
            },
            "transactions": [{
                "item_list": {
                    "items": items // the items
                },
                "amount": amount, // the amount
                "description": "Payment using PayPal"
            }]

        }

        paypal.payment.create(paymentData, function (err, payment) {
            if (err) {
              throw err;
            } else {
              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                  res.redirect(payment.links[i].href)
                }
              }
            }
          })




    } catch (error) {

    }

}

const loadPage = (req, res) => {
    res.sendFile('index.html', { root: __dirname });
  };

  const handlePayment = (req, res) => {
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
  }

module.exports = {paypalPayment,loadPage,handlePayment};