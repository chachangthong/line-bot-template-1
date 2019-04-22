const express = require('express');
const line = require('@line/bot-sdk');
const http = require('http');

const MongoClient = require('mongodb').MongoClient;

var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var CONTACTS_COLLECTION = "data_changthong";
var db;

const url = process.env.MONGODB_URI;
mongodb.MongoClient.connect(url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
db = database;
console.log("Database connection ready");


require('dotenv').config();

const app = express();

    
////////////////////////////////////////////////////////////////////////////////////////////
const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
};

const client = new line.Client(config);

app.get('/',function (req, res) {
    res.end("ok bot")
    })

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
	
});
////////////////////////////////////////////////////////////////////////////////////////////    
    

    
    
    
    

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
    var uid = event.source.userId

    if (eventText === 'สินค้าช้างทอง') {
        msg = {
            'type': 'image',
            'originalContentUrl': 'https://www.igetweb.com/uploads/269/filemanager/211ef0e293ebc51c26deb468b13f52ac_full.png',
            'previewImageUrl': 'https://www.igetweb.com/uploads/269/filemanager/211ef0e293ebc51c26deb468b13f52ac_full.png'
        }
    } 
    //////////////////
    else if (eventText === 'แต้มสะสม') {

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
	    db.collection(CONTACTS_COLLECTION).insertOne({uid: uid, text: eventText,});
	    console.log("-- > uid : "+ event.source.userId);
	    	//var newContact = "{title: totoken, age: eventText}"
    }
    
    ////////////////////////
    else if (eventText === 'สูตรชงเครื่องดื่ม') {
        msg ={
  "type": "template",
  "altText": "สูตรชงเครื่องดื่ม",
  "template": {
    "type": "carousel",
    "actions": [],
    "columns": [
      {
        "thumbnailImageUrl": "https://www.igetweb.com/uploads/269/filemanager/cb1df6cdbb19a80b25c96181a6f667cc_full.jpg",
        "title": "สูตรชงชาเย็น",
        "text": "อร่อย กลมกล่อม อย่างลงตัว",
        "actions": [
          {
            "type": "uri",
            "label": "ดูสูตรชง",
            "uri": "line://app/1566203051-d890Z5L7"
          }
        ]
      },
      {
        "thumbnailImageUrl": "https://www.igetweb.com/uploads/269/filemanager/cf6f56e252a9b4f50a0e6f67702ed3af_full.jpg",
        "title": "สูตรชงชาเขียว",
        "text": "รสชาติและกลิ่นชาเขียวแท้ ",
        "actions": [
          {
            "type": "uri",
            "label": "ดูสูตรชง",
            "uri": "line://app/1566203051-jk5ARl9y"
          }
        ]
      },
      {
        "thumbnailImageUrl": "https://www.igetweb.com/uploads/269/filemanager/cf6c6dc522abca1e89d0ba265298dd53_full.jpg",
        "title": "สูตรชงกาแฟ",
        "text": "เข้มข้นถึงใจ หอมกรุ่นตั้งแต่ฉีกซอง",
        "actions": [
          {
            "type": "uri",
            "label": "ดูสูตรชง",
            "uri": "line://app/1566203051-J8KvGEox"
          }
        ]
      },
      {
        "thumbnailImageUrl": "https://www.igetweb.com/uploads/269/filemanager/60cabb85e7f506abeb32372690688bb8_full.jpg",
        "title": "สูตรชงโกโก้",
        "text": "เข้มข้น หอม หวาน สไตล์โกโก้",
        "actions": [
          {
            "type": "uri",
            "label": "ดูสูตรชง",
            "uri": "line://app/1566203051-an9QNEgx"
          }
        ]
      }
    ]
  }
} 

    }
    //////////////////
    
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

    https.get("http://fb-alert-iot.herokuapp.com/notify?token=hCT2D0fMV2NwALN0xYv70wAlcJGXBYMGzUOjT4xs5Nq&msg="+ eventText , (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
    
    
    
    
    
    
    return client.replyMessage(event.replyToken, msg);
}
    
    
    
    
    app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
	
	});


