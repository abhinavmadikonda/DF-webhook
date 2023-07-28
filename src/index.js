const express = require('express');
// const ngrok = require('ngrok')
const app = express();
const port = (process.env.PORT || 3000)

// const port = sys.env.getOrElse("PORT","9000").toInt
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const responsePayload = {
    "fulfillmentMessages": [
        {
            "text": {
                "text": [
                    "Balance is 4268"
                ]
            }
        }
    ]
}
const responsePayload1 = {
    "fulfillmentMessages": [
        {
            "text": {
                "text": [
                    "Balance is 88888"
                ]
            }
        }
    ]
}
// const responsePayload2 = {
//     "fulfillmentMessages": [
//         {
//             "text": {
//                 "text": [
//                     "Balance is 0"
//                 ]
//             }
//         }
//     ]
// }

const fulfillmentText1 = {
    "fulfillmentText": "Hey Abhi! We've got a thrilling offer for you. The interest rate? Just 8%, which is 1% lower than traditional rates! Stay tuned for more exciting details!",
    "fulfillmentMessages": [
        {
            "text": {
                "text": [
                    "Hey Abhi! We've got a thrilling offer for you. The interest rate? Just 8%, which is 1% lower than traditional rates! Stay tuned for more exciting details!"
                ]
            }
        }
    ]
}
const fulfillmentText2 = {
    "fulfillmentText": "Interest rate is 10%",
    "fulfillmentMessages": [
        {
            "text": {
                "text": [
                    "Interest rate is 10%"
                ]
            }
        }
    ]
}
const fulfillmentText3 = {
    "fulfillmentText": "Interest rate is 9%",
    "fulfillmentMessages": [
        {
            "text": {
                "text": [
                    "Interest rate is 9%"
                ]
            }
        }
    ]
}
app.post('/webhooks', function (req, res) {
    const { originalDetectIntentRequest: {payload} }  = req.body;
    console.log('webhook route invoked with payload:'+ JSON.stringify(req.body));
    if(payload.name.toLowerCase().equals("abhi")){
        res.send(fulfillmentText1)
    } else if(payload.name === 'venkat') {
        res.send(fulfillmentText2);
    } else {
        res.send(fulfillmentText3);
    }
});

app.get('/', function (req, res) {
    res.send('ping successfull');
})

app.listen(port, function () {
    console.log('Listening for webhooks on port 3000');

    // start ngrok and create a tunnel to port 3000
    /**
    (async function() {
        const url = await ngrok.connect(3000);
    })();
    **/
})
