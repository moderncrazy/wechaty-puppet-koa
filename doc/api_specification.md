# wechaty-puppet-mock-koa API specification

### 1. Overview

This document captures the system interface specification.

Default prefix: `/mock`

| Interface Name      | Interface Desc               | Method | Status |
| ------------------- | ---------------------------- | ------ | ------ |
| /login              | Login                        | POST   | DONE   |
| /logout             | Logout                       | POST   | DONE   |
| /reset              | Restart                      | POST   | DONE   |
| /contact            | Query contact                | GET    | DONE   |
| /contact            | Create or update contact     | PUT    | DONE   |
| /contact            | Delete contact               | DELETE | DONE   |
| /message/room       | Send a message by room       | POST   | DONE   |
| /message/single     | Send a message by contact    | POST   | DONE   |
| /room               | Query room                   | GET    | DONE   |
| /room/member        | Query room member            | GET    | DONE   |
| /room               | Create or update room        | PUT    | DONE   |
| /room/member        | Create or update room member | PUT    | DONE   |
| /room               | Delete room                  | DELETE | DONE   |
| /room/member        | Delete room member           | DELETE | DONE   |
| /room/join          | Join room                    | POST   | DONE   |
| /room/leave         | Leave room                   | POST   | DONE   |
| /room/topic         | Update room topic            | POST   | DONE   |
| /room/invite        | Invite to room               | POST   | DONE   |
| /friendship/confirm | Confirm friendship           | POST   | DONE   |
| /friendship/receive | Receive friendship           | POST   | DONE   |
| /friendship/verify  | Verify friendship            | POST   | DONE   |
| /friendship/unknown | Unknown friendship           | POST   | DONE   |

### 2. Interface Definition

**[POST] /login**

- Input

| Field_EN | required | Field Type | Remarks                                                      |
| -------- | -------- | ---------- | ------------------------------------------------------------ |
| id       | Y        | String     | Contact id                                                   |
| name     | Y        | String     | Contact name                                                 |
| avatar   | Y        | String     | Contact avatar                                               |
| type     | Y        | Number     | Contact type, values:<br />**[0 - Unknown, 1 - Personal, 2 - Official]** |
| gender   | Y        | Number     | Contact gender, values:<br />**[0 - Unknown, 1 - Male, 2 - Female]** |
| city     | N        | String     | Contact city                                                 |
| alias    | N        | String     | Contact alias                                                |
| star     | N        | Boolean    | Contact star                                                 |
| weixin   | N        | String     | Contact weixin                                               |
| friend   | N        | Boolean    | Contact friend                                               |
| address  | N        | String     | Contact address                                              |
| province | N        | String     | Contact province                                             |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "test_1",
	"name": "test_1_name",
	"avatar": "test_1_avatar",
	"type": 1,
	"gender": 1,
	"city": "beijin",
	"alias": "test_1_name",
	"star": false,
	"weixin": "weixin",
	"friend": false,
	"address": "beijin",
	"province": "beijin"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /logout**

- Input

| Field_EN | required | Field Type | Remarks                                                      |
| -------- | -------- | ---------- | ------------------------------------------------------------ |
| id       | Y        | String     | Contact id                                                   |
| name     | Y        | String     | Contact name                                                 |
| avatar   | Y        | String     | Contact avatar                                               |
| reason   | Y        | String     | Logout reason                                                |
| type     | Y        | Number     | Contact type, values:<br />**[0 - Unknown, 1 - Personal, 2 - Official]** |
| gender   | Y        | Number     | Contact gender, values:<br />**[0 - Unknown, 1 - Male, 2 - Female]** |
| city     | N        | String     | Contact city                                                 |
| alias    | N        | String     | Contact alias                                                |
| star     | N        | Boolean    | Contact star                                                 |
| weixin   | N        | String     | Contact weixin                                               |
| friend   | N        | Boolean    | Contact friend                                               |
| address  | N        | String     | Contact address                                              |
| province | N        | String     | Contact province                                             |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "test_1",
	"name": "test_1_name",
	"avatar": "test_1_avatar",
	"reason": "logout",
	"type": 1,
	"gender": 1,
	"city": "beijin",
	"alias": "test_1_name",
	"star": false,
	"weixin": "weixin",
	"friend": false,
	"address": "beijin",
	"province": "beijin"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /reset**

- Input

| Field_EN | required | Field Type | Remarks      |
| -------- | -------- | ---------- | ------------ |
| reason   | Y        | String     | Reset reason |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"reason": "reset"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[PUT] /contact**

- Input

| Field_EN | required | Field Type | Remarks                                                      |
| -------- | -------- | ---------- | ------------------------------------------------------------ |
| id       | Y        | String     | Contact id                                                   |
| name     | Y        | String     | Contact name                                                 |
| avatar   | Y        | String     | Contact avatar                                               |
| type     | Y        | Number     | Contact type, values:<br />**[0 - Unknown, 1 - Personal, 2 - Official]** |
| gender   | Y        | Number     | Contact gender, values:<br />**[0 - Unknown, 1 - Male, 2 - Female]** |
| city     | N        | String     | Contact city                                                 |
| alias    | N        | String     | Contact alias                                                |
| star     | N        | Boolean    | Contact star                                                 |
| weixin   | N        | String     | Contact weixin                                               |
| friend   | N        | Boolean    | Contact friend                                               |
| address  | N        | String     | Contact address                                              |
| province | N        | String     | Contact province                                             |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "test_1",
	"name": "test_1_name",
	"avatar": "test_1_avatar",
	"type": 1,
	"gender": 1,
	"city": "beijin",
	"alias": "test_1_name",
	"star": false,
	"weixin": "weixin",
	"friend": false,
	"address": "beijin",
	"province": "beijin"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[DELETE] /contact**

- Input

| Field_EN | required | Field Type | Remarks    |
| -------- | -------- | ---------- | ---------- |
| id       | Y        | String     | Contact id |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

Input:

```json
{
	"id":"test_1"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[GET] /contact**

- Input

| Field_EN | required | Field Type | Remarks    |
| -------- | -------- | ---------- | ---------- |
| id       | N        | String     | Contact id |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

Input:

```
/contact?id=bot_id
```

Output:

```json
{
    "state": 200,
    "data": [
        {
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
        }
    ],
    "message": "Request success!"
}
```

**[POST] /message/room**

- Input

| Field_EN      | required | Field Type | Remarks                                                      |
| ------------- | -------- | ---------- | ------------------------------------------------------------ |
| id            | Y        | String     | Message id                                                   |
| roomId        | Y        | String     | Room id                                                      |
| mentionIdList | Y        | Array      | Mention id list                                              |
| type          | Y        | Number     | Message type, values:<br />**[0 - Unknown, 1 - Attachment, 2 - Audio, 3 - Contact, 4 - ChatHistory, 5 - Emoticon, 6 - Image, 7 - Text, 8 - Location, 9 - MiniProgram, 10 - Transfer, 11 - RedEnvelope, 12 - Recalled, 13 - Url, 14 - Video]** |
| text          | N        | String     | Text                                                         |
| toId          | N        | String     | To id                                                        |
| fromId        | N        | String     | From id                                                      |
| filename      | N        | String     | Filename                                                     |
| timestamp     | N        | Number     | Timestamp, default **Current second timestamp**              |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "message_room_1",
	"roomId": "room_1",
	"mentionIdList": ["bot_id"],
	"type": 7,
	"text": "hello",
	"toId": "bot_id",
	"fromId": "friend_1",
	"filename": "/path/test.json"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /message/single**

- Input

| Field_EN  | required | Field Type | Remarks                                                      |
| --------- | -------- | ---------- | ------------------------------------------------------------ |
| id        | Y        | String     | Message id                                                   |
| toId      | Y        | String     | To id                                                        |
| fromId    | Y        | String     | From id                                                      |
| type      | Y        | Number     | Message type, values:<br />**[0 - Unknown, 1 - Attachment, 2 - Audio, 3 - Contact, 4 - ChatHistory, 5 - Emoticon, 6 - Image, 7 - Text, 8 - Location, 9 - MiniProgram, 10 - Transfer, 11 - RedEnvelope, 12 - Recalled, 13 - Url, 14 - Video]** |
| text      | N        | String     | Text                                                         |
| filename  | N        | String     | Filename                                                     |
| timestamp | N        | Number     | Timestamp, default **Current second timestamp**              |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "message_single_1",
	"type": 7,
	"text": "hello",
	"toId": "bot_id",
	"fromId": "friend_1",
	"filename": "/path/test.json"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[PUT] /room**

- Input

| Field_EN     | required | Field Type | Remarks             |
| ------------ | -------- | ---------- | ------------------- |
| id           | Y        | String     | Room id             |
| topic        | Y        | String     | Room topic          |
| adminIdList  | Y        | Array      | Room admin id list  |
| memberIdList | Y        | Array      | Room member id list |
| avatar       | N        | String     | Room avatar         |
| ownerId      | N        | String     | Room owner id       |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "test_room_1",
	"topic": "test_room_1",
	"adminIdList": ["member_1"],
	"memberIdList": ["member_1"],
	"avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
	"ownerId": "member_1"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[PUT] /room/member**

- Input

| Field_EN  | required | Field Type | Remarks            |
| --------- | -------- | ---------- | ------------------ |
| id        | Y        | String     | Room member id     |
| name      | Y        | String     | Room member name   |
| avatar    | Y        | String     | Room member avatar |
| roomAlias | N        | String     | Room member alias  |
| inviterId | N        | String     | Inviter id         |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "test_member_1",
	"name": "test_member_1_name",
	"avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
	"roomAlias": "test_member_1_alias",
	"inviterId": "member_1"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[DELETE] /room**

- Input

| Field_EN | required | Field Type | Remarks |
| -------- | -------- | ---------- | ------- |
| id       | Y        | String     | Room id |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id":"test_room_1"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[DELETE] /room/member**

- Input

| Field_EN | required | Field Type | Remarks        |
| -------- | -------- | ---------- | -------------- |
| id       | Y        | String     | Room member id |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id":"test_member_1"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[GET] /room**

- Input

| Field_EN | required | Field Type | Remarks |
| -------- | -------- | ---------- | ------- |
| id       | N        | String     | Room id |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```
/room?id=bot_id
```

Output:

```json
{
    "state": 200,
    "data": [
        {
            "id": "room_1",
            "topic": "room_topic",
            "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
            "ownerId": "friend_1",
            "adminIdList": [
                "friend_1",
                "friend_2"
            ],
            "memberList": [
                {
                    "name": "friend_1_name",
                    "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
                    "id": "friend_1",
                    "roomAlias": "friend_1_alias"
                },
                {
                    "name": "friend_2_name",
                    "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
                    "id": "friend_2",
                    "roomAlias": "friend_2_alias",
                    "inviterId": "friend_1"
                }
            ]
        }
    ],
    "message": "Request success!"
}
```

**[GET] /room/member**

- Input

| Field_EN | required | Field Type | Remarks        |
| -------- | -------- | ---------- | -------------- |
| id       | N        | String     | Room member id |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```
/room?id=bot_id
```

Output:

```json
{
    "state": 200,
    "data": [
        {
            "name": "friend_1_name",
            "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
            "id": "friend_1",
            "roomAlias": "friend_1_alias"
        },
        {
            "name": "friend_2_name",
            "avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
            "id": "friend_2",
            "roomAlias": "friend_2_alias",
            "inviterId": "friend_1"
        }
    ],
    "message": "Request success!"
}
```

**[POST] /room/join**

- Input

| Field_EN      | required | Field Type | Remarks                                         |
| ------------- | -------- | ---------- | ----------------------------------------------- |
| id            | Y        | String     | Room id                                         |
| inviterId     | Y        | String     | Inviter id                                      |
| inviteeIdList | Y        | Array      | Invitee id list                                 |
| timestamp     | N        | Number     | Timestamp, default **Current second timestamp** |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "test_room_1",
	"inviterId": "bot_id",
	"inviteeIdList": ["bot_id"]
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /room/leave**

- Input

| Field_EN     | required | Field Type | Remarks                                         |
| ------------ | -------- | ---------- | ----------------------------------------------- |
| id           | Y        | String     | Room id                                         |
| removerId    | Y        | String     | Remover id                                      |
| leaverIdList | Y        | Array      | Leaver id list                                  |
| timestamp    | N        | Number     | Timestamp, default **Current second timestamp** |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "room_1",
	"removerId": "bot_id",
	"leaverIdList": ["bot_id"]
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /room/topic**

- Input

| Field_EN  | required | Field Type | Remarks                                         |
| --------- | -------- | ---------- | ----------------------------------------------- |
| id        | Y        | String     | Room id                                         |
| newTopic  | Y        | String     | Room new topic                                  |
| oldTopic  | Y        | String     | Room old topic                                  |
| changerId | Y        | String     | Changer id                                      |
| timestamp | N        | Number     | Timestamp, default **Current second timestamp** |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "room_1",
	"newTopic": "room_1_test",
	"oldTopic": "room_1",
	"changerId": "bot_id"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /room/invite**

- Input

| Field_EN     | required | Field Type | Remarks                                         |
| ------------ | -------- | ---------- | ----------------------------------------------- |
| id           | Y        | String     | Room id                                         |
| topic        | Y        | String     | Room topic                                      |
| avatar       | Y        | String     | Room avatar                                     |
| inviterId    | Y        | String     | Inviter id                                      |
| invitation   | Y        | String     | Invitation                                      |
| receiverId   | Y        | String     | eceiver id                                      |
| memberCount  | Y        | Number     | Room member count                               |
| memberIdList | Y        | Array      | Room member id list                             |
| timestamp    | N        | Number     | Timestamp, default **Current second timestamp** |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "room_1",
	"topic": "room_topic",
	"avatar": "https://avatars0.githubusercontent.com/u/21285357?s=200&v=4",
	"inviterId": "bot_id",
	"invitation": "invitation",
	"receiverId": "friend_1",
	"memberCount": 1,
	"memberIdList": ["friend_1"]
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /friendship/confirm**

- Input

| Field_EN  | required | Field Type | Remarks                                         |
| --------- | -------- | ---------- | ----------------------------------------------- |
| id        | Y        | String     | Friendship id                                   |
| contactId | Y        | String     | Contact id                                      |
| hello     | N        | String     | Friendship remarks                              |
| timestamp | N        | Number     | Timestamp, default **Current second timestamp** |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "friendship_confirm_1",
	"contactId": "friend_1",
	"hello": "hello"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /friendship/receive**

- Input

| Field_EN  | required | Field Type | Remarks                                                      |
| --------- | -------- | ---------- | ------------------------------------------------------------ |
| id        | Y        | String     | Friendship id                                                |
| ticket    | Y        | String     | Friendship ticket                                            |
| contactId | Y        | String     | Contact id                                                   |
| hello     | N        | String     | Friendship remarks                                           |
| stranger  | N        | String     | Friendship stranger                                          |
| timestamp | N        | Number     | Timestamp, default **Current second timestamp**              |
| scene     | N        | Number     | Friendship scene type, values:<br />**[1 - QQ, 2 - Email, 3 - Weixin, 12 - QQtbd, 14 - Room, 15 - Phone, 17 - Card, 18 - Location, 25 - Bottle, 29 - Shaking, 30 - QRCode ]** |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "friendship_receive_1",
	"ticket": "ticket",
	"contactId": "friend_1",
	"hello": "hello",
	"stranger": "stranger",
	"scene": 3
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /friendship/verify**

- Input

| Field_EN  | required | Field Type | Remarks                                         |
| --------- | -------- | ---------- | ----------------------------------------------- |
| id        | Y        | String     | Friendship id                                   |
| contactId | Y        | String     | Contact id                                      |
| hello     | N        | String     | Friendship remarks                              |
| timestamp | N        | Number     | Timestamp, default **Current second timestamp** |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "friendship_confirm_1",
	"contactId": "friend_1",
	"hello": "hello"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```

**[POST] /friendship/unknown**

- Input

| Field_EN  | required | Field Type | Remarks                                         |
| --------- | -------- | ---------- | ----------------------------------------------- |
| id        | Y        | String     | Friendship id                                   |
| contactId | Y        | String     | Contact id                                      |
| hello     | N        | String     | Friendship remarks                              |
| timestamp | N        | Number     | Timestamp, default **Current second timestamp** |

- Output

| Field_EN | Field Type | Remarks                         |
| -------- | ---------- | ------------------------------- |
| state    | Number     | 200 – Normal, others - abnormal |
| data     | Object     | response data                   |
| message  | String     | response message                |

- Sample

 Input:

```json
{
	"id": "friendship_confirm_1",
	"contactId": "friend_1",
	"hello": "hello"
}
```

Output:

```json
{
    "state": 200,
    "message": "Request success!"
}
```
