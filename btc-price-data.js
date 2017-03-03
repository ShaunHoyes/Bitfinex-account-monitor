// Gives price/trade info (i.e. bids, asks, volume, etc.)
var request = require('request');
var bitfinexUrl = `https://api.bitfinex.com/v1`;

request.get(bitfinexUrl + "/pubticker/BTCUSD", function(error, response, body) {
    var data = JSON.parse(body);
    console.log(data);
});
