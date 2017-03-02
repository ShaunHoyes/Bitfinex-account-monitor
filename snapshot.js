// provides a snapshot of margin lending account
function wallet() {
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
var url = "https://api.bitfinex.com/v1";
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
  var exchangeUSD = data[3]['amount'];
  var exchangeBTC = data[2]['amount'];
  var depositUSD = data[1]['amount'];
  var depositBTC = data[0]['amount'];
  var totalUSD = parseFloat(exchangeUSD) + parseFloat(depositUSD);
  var totalBTC = parseFloat(exchangeBTC) + parseFloat(depositBTC);



  var balance = (function (amount) {
    request.get(url + "/pubticker/btcusd", function(error, response, body) {
    var data = JSON.parse(body);
    var calculation = parseFloat(data.last_price) * parseFloat(amount);
//    console.log(data.mid);
    console.log(colors.yellow("BTC wallet: " + "$" + calculation.toFixed(2) + " USD " + "(" + totalBTC.toFixed(8) + " BTC" + ")"));
});
});

  var totalBalance = (function (btc, usd) {
    request.get(url + "/pubticker/btcusd", function(error, response, body) {
      var data = JSON.parse(body);
      var calculation = (parseFloat(data.last_price) * parseFloat(btc)) + parseFloat(usd);
      console.log(colors.cyan("     Total: " + "$" + calculation.toFixed(2) + " USD"));

    })
  });

  console.log("\nBitfinex Funding Balance:");
  console.log(colors.green("USD wallet: $" + totalUSD.toFixed(2) + " USD"));
  balance(totalBTC.toFixed(8));
  setTimeout(function() {
    totalBalance(totalBTC, totalUSD);}, 1000)

});
};

function thirtyDayReturn() {
  // Margin Funding 30-day returns
  // All authenticated endpoints must include the following
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
    var url = "https://api.bitfinex.com/v1";
  // request
  var payload = {
    "request": "/v1/summary",
    "nonce": Date.now().toString()
  };
  payload = new Buffer(JSON.stringify(payload)).toString('base64');
  var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
  var options = {
    url: "/summary",
    headers: {
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: payload
  };
  var colors = require('colors');
  baseRequest.post(options, function(error, response, body) {
      var data = JSON.parse(body);
      var btc30day = (data.funding_profit_30d[1]['amount']);

      var conversion = (function (amount) {
        request.get(url + "/pubticker/btcusd", function(error, resopnse, body) {
          var data = JSON.parse(body);
          var calculation = parseFloat(data.last_price) * parseFloat(amount);
          console.log(colors.yellow("BTC: " + "  $" + calculation.toFixed(2) + " USD " + "(" + btc30day.toFixed(8) + " BTC" + ")"));
        });
      });

      var totalReturn = (function (btc, usd) {
        request.get(url + "/pubticker/btcusd", function(error, response, body) {
          var data = JSON.parse(body);
          var calculation = (parseFloat(data.last_price) * parseFloat(btc)) + parseFloat(usd);
          console.log(colors.cyan("Total: " + "$" + calculation.toFixed(2) + " USD"));
        })
      });

      console.log(colors.green.underline("\nBitfinex Snapshot"));
      console.log("\nMargin Funding Total Return (30 days):");
      console.log(colors.green("USD: " + "  $" + (data.funding_profit_30d[0]['amount']).toFixed(2) + " USD"));
      conversion(data.funding_profit_30d[1]['amount']);
      setTimeout(function() {
            totalReturn(data.funding_profit_30d[1]['amount'], data.funding_profit_30d[0]['amount']);}, 500)
  });
};

function activeCredits() {
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
      console.log(colors.green(data.length + " active credits"));
  });
};

thirtyDayReturn();

setTimeout(function() {
  wallet();
}, 2000);

setTimeout(function() {
  activeCredits();
  console.log(" ");
}, 5000);
