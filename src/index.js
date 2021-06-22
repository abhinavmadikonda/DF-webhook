const express = require('express');
const ngrok = require('ngrok')
const app = express();

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
    const { originalDetectIntentRequest: {payload} }  = req.body;
    if(payload.customer === 'abhi'){
        res.send(responsePayload)
    } else {
        res.send(responsePayload1);
    }
});

app.listen(3000, function () {
    console.log('Listening for webhooks on port 3000');

    // start ngrok and create a tunnel to port 3000
    /**
    (async function() {
        const url = await ngrok.connect(3000);
    })();
    **/
})
