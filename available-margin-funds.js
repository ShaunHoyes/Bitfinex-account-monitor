// shows the available funds (profit) in your account from margin lending activities
var colors = require('colors');
var
  request = require('request'),
  crypto = require('crypto'),
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
  "request": "/v1/balances",
  "nonce": Date.now().toString()
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
var options = {
  url: "/balances",
  headers: {
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: payload
};

baseRequest.post(options, function(error, response, body) {
  var data = JSON.parse(body);
  var satoshi = parseFloat(data[0]['available']);
  console.log("Bitfinex Funds Available for Use:");
  console.log(colors.green("USD: " + "$" + data[1]['available']));
  console.log(colors.yellow("BTC: " + satoshi * 100000000 + ' satoshi'));
});