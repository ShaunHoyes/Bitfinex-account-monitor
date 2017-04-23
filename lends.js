"use strict";
// returns interest rate for desired currency
// input desired currency using 3-letter ticker symbol via command line:
//    $ node lends.js {desired currency}
const
  api = require('./api'),
  currency = process.argv[2],
  payload = {
  "timestamp": false,
  "limit_lends": 1
},
  options = {
    url: api.url + `/lends/` + currency,
    qs: payload
  };

api.request.get(options, function(error, response, body) {
    var data = JSON.parse(body);
    console.log(`Bitfinex lending stats:\n`)
    console.log(`${currency} interest rate: ${data[0]['rate']}%`);
    console.log(`Lent: ${data[0]['amount_lent']} USD`);
    console.log(`Used: ${data[0]['amount_used']} USD`);
});
