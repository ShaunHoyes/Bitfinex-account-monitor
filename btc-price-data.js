// Gives price/trade info (i.e. bids, asks, volume, etc.)
var request = require('request');
var bitfinexUrl = "https://api.bitfinex.com/v1";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};

request.get(bitfinexUrl + "/pubticker/BTCUSD", function(error, response, body) {
    var data = JSON.parse(body);
    console.log(data);
    // console.log("$" + numberWithCommas(data.last_price) + " USD");
});
