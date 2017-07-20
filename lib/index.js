'use strict';
const crypto = require('crypto');
const querystring = require('querystring');
const Promise = require('bluebird');
const request = require('superagent');

const endpoints = {
  public: ['Time', 'Assets', 'AssetPairs', 'Ticker', 'Depth', 'Trades', 'Spread', 'OHLC'],
  private: ['Balance', 'TradeBalance', 'OpenOrders', 'ClosedOrders', 'QueryOrders', 'TradesHistory', 'QueryTrades', 'OpenPositions', 'Ledgers', 'QueryLedgers', 'TradeVolume', 'AddOrder', 'CancelOrder', 'DepositMethods', 'DepositAddresses', 'DepositStatus', 'WithdrawInfo', 'Withdraw', 'WithdrawStatus', 'WithdrawCancel']
};

class KrakenClient {
  constructor(key, secret, otp) {
    this.config = {
      url: 'https://api.kraken.com',
      version: '0',
      key,
      secret,
      otp
    };
  }

  api(method, params = {}) {
    if (endpoints.public.indexOf(method) !== -1) {
      return this.publicEndpoint(method, params);
    } else if (endpoints.private.indexOf(method) !== -1) {
      return this.privateEndpoint(method, params);
    }
    throw new Error(`${method} is not a method.`);
  }

  publicEndpoint(method, params) {
    const url = `${this.config.url}/${this.config.version}/public/${method}`;
    return this._fetch(url, {}, params);
  }

  privateEndpoint(method, params) {
    const path = `/${this.config.version}/private/${method}`;
    const url = `${this.config.url}${path}`;
    if (!params.nonce) {
      params.nonce = new Date() * 1000;
    }
    if (this.config.otp !== undefined) {
      params.otp = this.config.otp;
    }
    const sig = this.generateSignature(path, params);
    const headers = {
      'API-Key': this.config.key,
      'API-Sign': sig
    };
    return this._fetch(url, headers, params);
  }

  generateSignature(path, params) {
    const message = querystring.stringify(params);
    const secret = new Buffer(this.config.secret, 'base64');
    // eslint-disable-next-line new-cap
    const hash = new crypto.createHash('sha256');
    // eslint-disable-next-line new-cap
    const hmac = new crypto.createHmac('sha512', secret);

    const hashDigest = hash.update(params.nonce + message).digest('binary');
    const hmacDigest = hmac.update(path + hashDigest, 'binary').digest('base64');
    return hmacDigest;
  }

  _fetch(url, headers, params) {
    headers['User-Agent'] = 'Kraken Javascript API Client';
    return new Promise((resolve, reject) => {
      request.post(url)
        .type('form')
        .set(headers)
        .send(params)
        .end((err, res) => {
          if (err) {
            reject(err);
          } else if (res.body.error.length > 0) {
            reject(res.body.error);
          } else {
            resolve(res.body.result);
          }
        });
    });
  }
}

module.exports = KrakenClient;
