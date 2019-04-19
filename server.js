const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'ช้างทองสวัสดีคะ 🙂'
    };

    var eventText = event.message.text.toLowerCase();

    if (eventText === 'สินค้าช้างทอง') {
        msg = {
            'type': 'image',
            'originalContentUrl': 'https://www.igetweb.com/uploads/269/filemanager/211ef0e293ebc51c26deb468b13f52ac_full.png',
            'previewImageUrl': 'https://www.igetweb.com/uploads/269/filemanager/211ef0e293ebc51c26deb468b13f52ac_full.png'
        }
    } else if (eventText === 'แต้มสะสม') {
        msg = {
            
  "type": "flex",
  "altText": "แต้มสะสม",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "hero": {
      "type": "image",
      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
      "align": "start",
      "gravity": "top",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover",
      "action": {
        "type": "uri",
        "label": "Line",
        "uri": "https://linecorp.com/"
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "flex": 8,
      "contents": [
        {
          "type": "text",
          "text": "แต้มสะสม",
          "size": "lg",
          "weight": "bold"
        },
        {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "margin": "lg",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "แต้มทั้งหมด",
                  "flex": 10,
                  "size": "lg",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": "200",
                  "flex": 5,
                  "size": "xl",
                  "weight": "bold",
                  "color": "#FF0000",
                  "wrap": true
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "ใช้ไปแล้ว",
                  "flex": 10,
                  "size": "lg",
                  "align": "start",
                  "gravity": "top",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": "50",
                  "flex": 5,
                  "size": "xl",
                  "align": "start",
                  "gravity": "top",
                  "weight": "bold",
                  "color": "#FF0000",
                  "wrap": true
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "คงเหลือ",
                  "flex": 10,
                  "size": "lg",
                  "align": "start",
                  "gravity": "top",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": "50",
                  "flex": 5,
                  "size": "xl",
                  "align": "start",
                  "gravity": "top",
                  "weight": "bold",
                  "color": "#FF0000",
                  "wrap": true
                }
              ]
            }
              
              
              
          ]
        }
      ]
    }
  }

        }
    }
    
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
    /*
    else if (eventText === 'location') {
        msg = {
            "type": "location",
            "title": "my location",
            "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
            "latitude": 35.65910807942215,
            "longitude": 139.70372892916203
        }
    } else if (eventText === 'template button') {
        msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Menu",
                "text": "Please select",
                "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                }, {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                }, {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }]
            }
        }
    } else if (eventText === 'template confirm') {
        msg = {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "Are you sure?",
                "actions": [{
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                }, {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }]
            }
        }
    } else if (eventText === 'carousel') {
        msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
                                "data": "action=buy&itemid=111"
                            },
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=111"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "http://example.com/page/111"
                            }
                        ]
                    },
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
                                "data": "action=buy&itemid=222"
                            },
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=222"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "http://example.com/page/222"
                            }
                        ]
                    }
                ]
            }
        }
    }
*/
    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
