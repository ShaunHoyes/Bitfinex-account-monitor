"use strict";
// latest bitcoin price in USD (using the Bitfinex BTC/USD price)
const api = require('./api');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};

api.request.get(api.url + "/pubticker/BTCUSD", function(error, response, body) {
    var data = JSON.parse(body);
    console.log(api.colors.green("$" + numberWithCommas(data.last_price) + " USD"));
});
