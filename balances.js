const
  request = require('request'),
  crypto = require('crypto'),
  api_key = <api_key>,
  api_secret = <api_secret>,
  baseRequest = request.defaults({
    headers: {
        'X-BFX-APIKEY': api_key,
    },
    baseUrl: `https://api.bitfinex.com/v1`
  });

let payload = {
  "request": `/v1/balances`,
  "nonce": Date.now().toString()
};
payload = new Buffer(JSON.stringify(payload)).toString(`base64`);
let signature = crypto.createHmac(`sha384`, api_secret).update(payload).digest(`hex`);
let options = {
  url: `/balances`,
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};

baseRequest.post(options, function(error, response, body) {
  let data = JSON.parse(body);
  console.log(`Account Balance(s):\n`);
  for (let i = 0; i < data.length; i += 1){
    if (data[i]['amount'] != 0) {
      console.log(`${data[i]['type']} account: ${data[i]['amount']} ${data[i]['currency']}`);
    }
  }
});