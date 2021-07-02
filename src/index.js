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

const fulfillmentText = {
    "fulfillmentText": "testing fulfillment text"
}
app.post('/webhooks', function (req, res) {
    const { originalDetectIntentRequest: {payload} }  = req.body;
    console.log('webhook route invoked with payload:'+ JSON.stringify(req.body));
    const {firstName, phoneNumber ,address, age} = payload;
    console.log('abhinav log: '+ firstName + address)
    if(payload.customerId === 'abhi'){
        res.send(fulfillmentText)
    } else if(payload.customerId === 'john') {
        res.send(fulfillmentText);
    } else {
        res.send(fulfillmentText);
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
