// generates a new bitcoin address for deposit into your Exchange wallet
const crypto = require('crypto');
const
  request = require('request'),
  api_key = <api_key>,
  api_secret = <api_secret>,
  baseRequest = request.defaults({
    headers: {
        'X-BFX-APIKEY': api_key,
    },
    baseUrl: "https://api.bitfinex.com/v1"
  });

let payload = {
  "request": "/v1/deposit/new",
  "nonce": Date.now().toString(),
  "method": "bitcoin",
  "wallet_name": "exchange",
  "renew": 1
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
var options = {
  url: "/deposit/new",
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};
baseRequest.post(options, function(error, response, body) {
    let data = JSON.parse(body);
    console.log(`Exchange account ${data.method}:`);
    console.log(`${data.address}`);
});
