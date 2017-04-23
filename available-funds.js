"use strict";
// shows balances for all Bitfinex sub-accounts
const api = require('./api');
let payload = {
  "request": `/v1/balances`,
  "nonce": Date.now().toString()
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
let signature = api.crypto.createHmac("sha384", api.api_secret).update(payload).digest('hex');
let options = {
  url: `/balances`,
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};

api.baseRequest.post(options, function(error, response, body) {
  let data = JSON.parse(body);
  let satoshi = parseFloat(data[0]['available']);
  console.log(`Bitfinex Account Balance(s):\n`);
  for (let i = 0; i < data.length; i += 1) {
    if (data[i]['amount'] != 0) {
      console.log(`${data[i]['currency']} ${data[i]['type']} account:`);
      console.log(`amount: ${data[i]['amount']} ${data[i]['currency']}`);
      console.log(`available: ${data[i]['available']} ${data[i]['currency']}\n`);
    }
  }
});
