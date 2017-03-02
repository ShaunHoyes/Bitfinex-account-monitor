// provides a snapshot of margin lending account
const
    api_key = <api_key>,
    api_secret = <api_secret>,
    colors = require('colors'),
    crypto = require('crypto'),
    request = require('request'),
    url = 'https://api.bitfinex.com/v1';

function wallet() {
  const baseRequest = request.defaults({
    headers: {
        'X-BFX-APIKEY': api_key,
    },
    baseUrl: "https://api.bitfinex.com/v1"
  });
  // request
  let payload = {
    "request": "/v1/balances",
    "nonce": Date.now().toString()
  };
  payload = new Buffer(JSON.stringify(payload)).toString('base64');
  let signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
  let options = {
    url: "/balances",
    headers: {
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: payload
  };

  baseRequest.post(options, function(error, response, body) {
    let data = JSON.parse(body);
    let exchangeUSD = data[3]['amount'];
    let exchangeBTC = data[2]['amount'];
    let depositUSD = data[1]['amount'];
    let depositBTC = data[0]['amount'];
    let totalUSD = parseFloat(exchangeUSD) + parseFloat(depositUSD);
    let totalBTC = parseFloat(exchangeBTC) + parseFloat(depositBTC);
    let balance = (function (amount) {
      request.get(url + "/pubticker/btcusd", function(error, response, body) {
      let data = JSON.parse(body);
      let calculation = parseFloat(data.last_price) * parseFloat(amount);
      console.log(colors.yellow(`BTC wallet: $${calculation.toFixed(2)} USD (${totalBTC.toFixed(8)} BTC)`));
      });
    });
    let totalBalance = (function (btc, usd) {
      request.get(url + "/pubticker/btcusd", function(error, response, body) {
        let data = JSON.parse(body);
        let calculation = (parseFloat(data.last_price) * parseFloat(btc)) + parseFloat(usd);
        // console.log(colors.cyan("     Total: " + "$" + calculation.toFixed(2) + " USD"));
        console.log(colors.cyan(`Total: $${calculation.toFixed(2)} USD`))

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
  const baseRequest = request.defaults({
    headers: {
        'X-BFX-APIKEY': api_key,
    },
    baseUrl: "https://api.bitfinex.com/v1"
  });
  // request
  let payload = {
    "request": "/v1/summary",
    "nonce": Date.now().toString()
  };
  payload = new Buffer(JSON.stringify(payload)).toString('base64');
  let signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
  let options = {
    url: "/summary",
    headers: {
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: payload
  };
  baseRequest.post(options, function(error, response, body) {
      let data = JSON.parse(body);
      let btc30day = (data.funding_profit_30d[1]['amount']);

      let conversion = (function (amount) {
        request.get(url + "/pubticker/btcusd", function(error, resopnse, body) {
          let data = JSON.parse(body);
          let calculation = parseFloat(data.last_price) * parseFloat(amount);
          console.log(colors.yellow("BTC: " + "  $" + calculation.toFixed(2) + " USD " + "(" + btc30day.toFixed(8) + " BTC" + ")"));
        });
      });
      let totalReturn = (function (btc, usd) {
        request.get(url + "/pubticker/btcusd", function(error, response, body) {
          let data = JSON.parse(body);
          let calculation = (parseFloat(data.last_price) * parseFloat(btc)) + parseFloat(usd);
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
  const baseRequest = request.defaults({
    headers: {
        'X-BFX-APIKEY': api_key,
    },
    baseUrl: "https://api.bitfinex.com/v1"
  });

  // request
  let payload = {
    "request": "/v1/credits",
    "nonce": Date.now().toString()
  };
  payload = new Buffer(JSON.stringify(payload)).toString('base64');
  let signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
  let options = {
    url: "/credits",
    headers: {
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: payload
  };
  baseRequest.post(options, function(error, response, body) {
      let data = JSON.parse(body);
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