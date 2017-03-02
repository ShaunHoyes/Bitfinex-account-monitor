// displays all active provided loans
var colors = require('colors');
var crypto = require('crypto');
var
  request = require('request'),
  api_key = <api_key>,
  api_secret = <api_secret>,
  baseRequest = request.defaults({
    headers: {
        'X-BFX-APIKEY': api_key,
    },
    baseUrl: "https://api.bitfinex.com/v1"
  });

// request
var payload = {
  "request": "/v1/credits",
  "nonce": Date.now().toString()
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
var options = {
  url: "/credits",
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};
baseRequest.post(options, function(error, response, body) {
    var data = JSON.parse(body);
    console.log(colors.cyan(data.length + " active credits"));
    console.log(" ");
    console.log(data);

});
