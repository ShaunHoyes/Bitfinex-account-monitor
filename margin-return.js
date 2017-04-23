"use strict";
// Margin-Funding returns per currency
const api = require('./api');
let payload = {
  "request": "/v1/summary", // balances, summary, credits
  "nonce": Date.now().toString()
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
let signature = api.crypto.createHmac("sha384", api.api_secret).update(payload).digest('hex');
let options = {
  url: "/summary",
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};

api.baseRequest.post(options, function(error, response, body) {
  let data = JSON.parse(body);
  console.log("30-day Margin-Funding returns:");
  for (let i = 0; i < data.funding_profit_30d.length; i += 1) {
    if (data.funding_profit_30d[i].amount != 0) {
      console.log(data.funding_profit_30d[i].amount + " " + data.funding_profit_30d[i].curr)
    }

  }
});
