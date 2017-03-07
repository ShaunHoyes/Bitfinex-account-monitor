"use strict";

// Gives price/trade info (i.e. bids, asks, volume, etc.)
const request = require('request');
const bitfinexUrl = `https://api.bitfinex.com/v1`;

request.get(bitfinexUrl + "/pubticker/BTCUSD", function(error, response, body) {
    const data = JSON.parse(body);
    console.log(data);
});
