"use strict";

const
  request = require('request'),
  url = `https://api.bitfinex.com/v1`,
  payload = {
  "timestamp": false,
  "limit_lends": 1
},
  options = {
    url: url + `/lends/USD`,
    qs: payload
  };

request.get(options, function(error, response, body) {
    let data = JSON.parse(body);
    console.log(`Bitfinex lending stats:\n`)
    console.log(`Interest rate: ${data[0]['rate']}%`);
    console.log(`Lent: ${data[0]['amount_lent']} USD`);
    console.log(`Used: ${data[0]['amount_used']} USD`);
});
