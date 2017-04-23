const
  api_key = <api_key>, // insert your api_key here
  api_secret = <api_secret>, // insert your api_secret here
  colors = require('colors'),
  crypto = require('crypto'),
  request = require('request'),
  url = 'https://api.bitfinex.com/v1';

const baseRequest = request.defaults({
  headers: {
      'X-BFX-APIKEY': api_key,
  },
  baseUrl: "https://api.bitfinex.com/v1"
});

module.exports.api_key = api_key;
module.exports.api_secret = api_secret;
module.exports.colors = colors;
module.exports.crypto = crypto;
module.exports.request = request;
module.exports.url = url;
module.exports.baseRequest = baseRequest;
