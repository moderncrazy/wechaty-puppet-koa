# wechaty-puppet-mock-koa

packaging with koa based on wechaty-puppet-mock, It is convenient to test wechaty with restful interface.

## Install

```shell
$ npm install wechaty-puppet-mock-koa --save-dev
```

## Usage

`PuppetKoa` Class

- `constructor([options])` - new class `PuppetKoa` instance

  - `options.port` - http listen port, default to `3000`.
  - `options.prefix` - http request prefix, default to `/mock`.
  - `options.loginData` - information used to simulate login.
    - `options.loginData.id` - login bot id, default to `bot_id`.
    - `options.loginData.status` - login bot status, default to `0`.
    - `options.loginData.qrcode` - login bot qrcode, default to `https://not-exist.com`.
  - `options.initFile` - initial imported `login`, `contact`, `room` data, is a JSON file path, default to `null`.

  **NOTE:`loginData` not required if `initFile` exists**

## Example

**index.js**

```javascript
const {PuppetKoa} = require('wechaty-puppet-mock-koa');
const {PuppetPadplus} = require('wechaty-puppet-padplus');

let puppet = null;

if (process.env.NODE_ENV != 'dev') {
  // use ipad puppet
  puppet = new PuppetPadplus({token: 'xxx'});
} else {
  // use mock puppet
  puppet = new PuppetKoa({port:3001,prefix:'/api',initFile:'./initFile.json'});
}

// create bot
const bot = new Wechaty({name: config.botName, puppet});

...
```

**initFile.json**

```json
{
  "login": {
    "id": "bot_id",
    "name": "bot_name",
    "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
    "type": 1,
    "gender": 1,
    "city": "shanghai",
    "alias": "bot_alias",
    "star": false,
    "weixin": "weixin",
    "friend": true,
    "address": "shanghai",
    "province": "shanghai"
  },
  "contactList": [
    {
      "id": "friend_1",
      "name": "friend_1_name",
      "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
      "type": 1,
      "gender": 1,
      "city": "shanghai",
      "alias": "friend_1_alias",
      "star": false,
      "weixin": "weixin",
      "friend": true,
      "address": "shanghai",
      "province": "shanghai"
    }
  ],
  "roomMemberList": [
    {
      "id": "member_1",
      "roomAlias": "member_1_alias",
      "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
      "name": "member_1_name"
    }
  ],
  "roomList": [
    {
      "id": "room_1",
      "topic": "room_topic",
      "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
      "ownerId": "member_1",
      "adminIdList": [
        "member_1"
      ],
      "memberIdList": [
        "member_1"
      ]
    }
  ]
}
```

