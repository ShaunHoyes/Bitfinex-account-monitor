"use strict";
// displays all active provided loans
const api = require('./api');
let payload = {
  "request": "/v1/credits",
  "nonce": Date.now().toString()
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
let signature = api.crypto.createHmac("sha384", api.api_secret).update(payload).digest('hex');
let options = {
  url: '/credits',
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};
api.baseRequest.post(options, function(error, response, body) {
    let data = JSON.parse(body);
    console.log(api.colors.cyan(`${data.length} active loans\n`));
    console.log(data);
});
