# wechaty-puppet-mock-koa

packaging with koa based on wechaty-puppet-mock, It is convenient to test wechaty with restful interface.

## Install

```shell
$ npm install wechaty-puppet-mock-koa --save-dev
```

## Usage

`PuppetKoa` Class

- `constructor([options])` - new class `PuppetKoa` instance
  - `options.id` - login user id, default to `login_user_id`.
  - `options.qrcode` - scan qrcode url, default to `https://not-exist.com`.
  - `options.status` - scan qrcode status, default to `0`.
  - `options.data` - scan qrcode data, default to `null`.
  - `options.port` - http listen port, default to `3000`.
  - `options.prefix` - http request prefix, default to `/mock`.

## Example

```javascript
const {PuppetKoa} = require('wechaty-puppet-mock-koa');
const {PuppetPadplus} = require('wechaty-puppet-padplus');

let puppet = null;

if (process.env.NODE_ENV != 'dev') {
  // use ipad puppet
  puppet = new PuppetPadplus({token: 'xxx'});
} else {
  // use mock puppet
  puppet = new PuppetKoa({id:'mock_id',port:3001,prefix:'/api'});
}

// create bot
const bot = new Wechaty({name: config.botName, puppet});

...
```



