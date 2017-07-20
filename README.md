# krakenapi [![NPM version][npm-image]][npm-url] [![Coverage Status](https://coveralls.io/repos/github/martolini/kraken-node/badge.svg?branch=master)](https://coveralls.io/github/martolini/kraken-node?branch=master)
> Api wrapper from kraken.com

## Installation

```sh
$ npm install --save kraken-node
```

## Usage

```js
const KrakenClient = require('kraken-node');
const kraken = new KrakenClient(key, secret);

kraken.api('Balance').then((data) => {
	console.log(data);
}).catch(console.error);

```
## License

MIT © [Martin Skow Røed](msroed.io)


[npm-image]: https://badge.fury.io/js/krakenapi.svg
[npm-url]: https://npmjs.org/package/krakenapi
[travis-image]: https://travis-ci.org/martolini/krakenapi.svg?branch=master
[travis-url]: https://travis-ci.org/martolini/krakenapi
[daviddm-image]: https://david-dm.org/martolini/krakenapi.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/martolini/krakenapi
