const crypto = require('crypto');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
if (dotenv) { dotenv.config(); }

const leverage = 50;
const quantityBitcoin = 0.02;
let positionAlreadyOpen = false;

const app = express();
const port = 5000;

app.use(bodyParser.text());

app.post('/', (req, res) => {
  console.log(req.body);
  main(req.body);
  res.send('ok');
});

app.listen(port, () => {
  console.log('App listening on port ' + port);
});

function main(signal) {
    setLeverage('BTC').then(() => {
      if (signal === 'buy') {
        openLongCloseShort('BTC').catch(err => {
          handleError(err);
          // resend request if error happened
          setTimeout(() => {
            main(signal);
          }, 1000);
        });
      } else {
        openShortCloseLong('BTC').catch(err => {
          handleError(err);
          setTimeout(() => {
            main(signal);
          }, 1000);
        });
      }
    }).catch(err => {
      handleError(err);
      setTimeout(() => {
        main(signal);
      }, 1000);
    });
}

function setLeverage(symbol) {
  const now = Date.now();

  const query = 'symbol=' + symbol + 'USDT' + '&leverage=' + leverage + '&timestamp=' + now;
  const hmac = createHmac(query);

  const options = {
    headers: {
      'X-MBX-APIKEY': process.env.binance_api_key
    }
  };

  const url = 'https://fapi.binance.com/fapi/v1/leverage?' + query + '&signature=' + hmac;

  return axios.post(url, null, options);
}

// Opening a long on market order is the same as closing short and vice versa, if the amount gets the position to 0.
function openLongCloseShort(symbol) {
  return createOrder(symbol, 'BUY').then(() => {
    console.log('LONG position opened');
    positionAlreadyOpen = true;
  }).catch(err => handleError(err));
}

function openShortCloseLong(symbol) {
  return createOrder(symbol, 'SELL').then(() => {
    console.log('SHORT position opened');
    positionAlreadyOpen = true;
  }).catch(err => handleError(err));
}

function createOrder(symbol, side) {
  const now = Date.now();

  let query =
    'symbol=' + symbol + 'USDT'
    + '&timestamp=' + now
    + '&side=' + side
    + '&type=' + 'MARKET';

  switch (symbol) {
    case 'BTC':
      if (positionAlreadyOpen) {
        query += '&quantity=' + quantityBitcoin * 2;
      } else {
        query += '&quantity=' + quantityBitcoin;
      }
      break;
    // future symbols with their own quantity
  }

  const hmac = createHmac(query);

  const options = {
    headers: {
      'X-MBX-APIKEY': process.env.binance_api_key
    }
  };

  const url = 'https://fapi.binance.com/fapi/v1/order?' + query + '&signature=' + hmac;

  return axios.post(url, null, options);
}

function createHmac(query) {
  return crypto.createHmac('sha256', process.env.binance_api_key_secret).update(query).digest('hex')
}

function handleError(err) {
  if (err.config && err.config.url) {
    console.log(err.config.url);
  }

  if (err.response && err.response.data) {
    console.log(err.response.data);
  } else {
    console.log(err);
  }
}