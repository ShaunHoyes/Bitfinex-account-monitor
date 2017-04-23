"use strict";
const api = require('../api');
// generates a new bitcoin address for deposit into your Deposit wallet

let payload = {
  "request": "/v1/deposit/new",
  "nonce": Date.now().toString(),
  "method": "bitcoin",
  "wallet_name": "deposit",
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
    console.log(`Deposit account ${data.method}:`);
    console.log(`${data.address}`);
});
