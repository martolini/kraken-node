const assert = require('assert');
const KrakenClient = require('../index.js');
require('dotenv').load();

var api;

describe('krakenapi', () => {
  it('Should create api instance', () => {
    api = new KrakenClient(process.env.API_KEY, process.env.API_SECRET);
    assert.ok(api, 'Instance is not created.');
  });

  it('Should check balance (private)', done => {
    api.api('Balance').then(data => {
      assert.ok(data, 'Data is OK.');
      assert(data.error.length === 0, 'Error in balance request.');
      done();
    }).catch(done);
  }, 10000);

  it('Should check time (public)', done => {
    api.api('Time').then(data => {
      assert.ok(data, 'Data is OK');
      assert(data.error.length === 0, 'Error in public call');
      done();
    }).catch(done);
  }, 10000);

  it('Should fail with invalid method name', () => {
    try {
      api.api('ShouldFail');
      assert(false, 'Does not fail.');
    } catch (e) {
    }
  });

  it('Should fail with invalid params', done => {
    api.api('Ticker', {
      pair: 'FAILPAIR'
    }).then(() => {
      done();
    }).catch(done);
  }, 10000);
});
