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

// receive message
bot.on('message', async (msg) => {
  console.log(msg.from().name(),msg.text());
});

...
```

**initFile.json**

- `login` configuration is required.
- the configuration of `login` and `contact` is consistent with the parameters of `create contact ([PUT] /mock/contact)` interface
- people in `roomMemberList` are better existing in the `contactList`
- the configuration of `room` is consistent with the parameters of `create room ([PUT] /mock/room)` interface

```json
// /doc/mock.json
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
      "id": "friend_1",
      "roomAlias": "friend_1_alias",
      "inviterId": "bot_id"
    }
  ],
  "roomList": [
    {
      "id": "room_1",
      "topic": "room_topic",
      "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
      "ownerId": "bot_id",
      "adminIdList": [
        "bot_id"
      ],
      "memberIdList": [
        "bot_id",
        "friend_1"
      ]
    }
  ]
}
```

**API sample**

- send message

  ```shell
  // request
  curl -X POST \
    http://localhost:3000/mock/message/single \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -H 'Postman-Token: f7f34936-8a75-41f3-b008-7c48992bceca' \
    -d '{
  	"type": 7,
  	"text": "hello",
  	"toId": "bot_id",
  	"fromId": "friend_1",
  	"filename": "/path/test.json"
  }'
  
  // response
  {"state":200,"message":"Request success!"}
  
  // console
  friend_1_name hello
  ```

**Reference resources**

- API Specification：**/doc/api_specification.md**
- Postman Script: **/doc/wechaty-puppet-mock-koa.postman_collection.json**

### Note
 - Run with wechaty 0.46.x+
