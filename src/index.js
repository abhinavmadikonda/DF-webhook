const express = require('express');
const ngrok = require('ngrok')
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
                    "Balance is 1245"
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
                    "Balance is 0"
                ]
            }
        }
    ]
}
app.post('/webhooks', function (req, res) {
    console.log('webhook route invoked');
    const { originalDetectIntentRequest: {payload} }  = req.body;
    if(payload.customPayload.customer === 'abhi'){
        res.send(responsePayload)
    } else {
        res.send(responsePayload1);
    }
});

app.get('/', function (req, res) {
    res.send('ping successful');
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
