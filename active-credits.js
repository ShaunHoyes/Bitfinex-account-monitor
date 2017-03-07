"use strict";

// displays all active provided loans
const
  colors = require('colors'),
  crypto = require('crypto'),
  request = require('request'),
  api_key = <api_key>,
  api_secret = <api_secret>,
  baseRequest = request.defaults({
    headers: {
        'X-BFX-APIKEY': api_key,
    },
    baseUrl: `https://api.bitfinex.com/v1`
  });

// request
let payload = {
  "request": "/v1/credits",
  "nonce": Date.now().toString()
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
let signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
let options = {
  url: `/credits`,
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};
baseRequest.post(options, function(error, response, body) {
    let data = JSON.parse(body);
    console.log(colors.cyan(`${data.length} active credits\n`));
    console.log(data);
});
