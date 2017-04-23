"use strict";
// generates a new bitcoin address for deposit into your Exchange wallet
const api = require('../api');
let payload = {
  "request": "/v1/deposit/new",
  "nonce": Date.now().toString(),
  "method": "bitcoin",
  "wallet_name": "exchange",
  "renew": 1
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
var signature = api.crypto.createHmac("sha384", api.api_secret).update(payload).digest('hex');
var options = {
  url: "/deposit/new",
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};
api.baseRequest.post(options, function(error, response, body) {
    let data = JSON.parse(body);
    console.log(`Exchange account ${data.method}:`);
    console.log(`${data.address}`);
});
