const assert = require('assert');
const KrakenClient = require('../index.js');
require('dotenv').load();

var api;

describe('krakenapi', () => {
  it('Should create api instance', () => {
    api = new KrakenClient(process.env.API_KEY, process.env.API_SECRET);
    assert.ok(api, 'Instance is OK.');
  });

  it('Should check balance (private)', done => {
    api.api('Balance').then(data => {
      assert.ok(data, 'Data is OK.');
      assert(data.error.length === 0, 'No errors.');
      done();
    });
  });

  it('Should check time (public)', done => {
    api.api('Time').then(data => {
      assert.ok(data, 'Data is OK');
      assert(data.error.length === 0, 'No errors');
      done();
    });
  });
});
