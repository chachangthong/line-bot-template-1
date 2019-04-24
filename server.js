const express = require('express');
const line = require('@line/bot-sdk');
const http = require('http');
var request = require('request');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://db-changthong.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "my-service-worker"
  }
});
var db = admin.database();
var ref = db.ref("/datdb");
ref.once("value", function(snapshot) {
  //console.log(snapshot.val());
});

////////////////////////////////////mongodb////////////////////////////////////////////////////////
/*
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
*/	
////////////////////////////////////////mongodb////////////////////////////////////////////////////

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

    //console.log(event);  // ปริ้นทั้งหมด
    
	
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
    var showLog = "{ UserID : "+uid +" , " + "msg : "  + eventText + "}"
    console.log(showLog);
    	

    if (eventText === 'สินค้าช้างทอง') {
        msg = {
            'type': 'image',
            'originalContentUrl': 'https://www.igetweb.com/uploads/269/filemanager/211ef0e293ebc51c26deb468b13f52ac_full.png',
            'previewImageUrl': 'https://www.igetweb.com/uploads/269/filemanager/211ef0e293ebc51c26deb468b13f52ac_full.png'
        }
    } 
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
    else if (eventText === 'แต้มสะสม') {
    
var userId = event.source.userId; 


//////////////////////////////////////////////////////
      client.getProfile(event.source.userId)
      .then((profile) => {
	 var nameU = profile.displayName;
	 //var pictureU = profile.pictureUrl;     
	    
//////////////////////////////////////////////////////	

// ข้อมูล
var data = { 
    name: nameU,		
}

//ตรวจสอบว่ามีข้อมูลไหม
ref.once("value", function(snapshot) {
  var pointU = snapshot.child(userId).child("point").val();

    if (pointU == null) {
    //ไม่มี ให้ลงข้อมูล
ref.child(userId).update(data, function(err) {
        if (err) {
  //ref.push(data) ลงข้อมูลไม่ได้ มีปัญหา
            } else {
  //ลงข้อมูลได้  
        }
});
console.log("ไม่มีข้อมูล --  ลงใหม่");

    } else { //มีข้อมูลแล้ว
            
console.log("คะแนน"+ pointU);
 }	// ของ else ส่งคะแนน	
 
	msg = {
                type: 'text',
                text: "รอการอัพเดท"
            };
	
	
});	




	    

    

//////////////////////////////////////////////////////

//////////////////////////////////////////////////////	//////////////////////////////////////////////////////		    	    	    

    
//////////////////////////////////////////////////////	    
})	//client.getProfile    
//////////////////////////////////////////////////////  //////////////////////////////////////////////////////	    

	   // db.collection(CONTACTS_COLLECTION).insertOne({uid: uid, text: eventText,});
	    //console.log("-- > uid : "+ event.source.userId);
	    	//var newContact = "{title: totoken, age: eventText}"

}// ของ else if  'แต้มสะสม'
    
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


    //request('http://fb-alert-iot.herokuapp.com/notify?token=hCT2D0fMV2NwALN0xYv70wAlcJGXBYMGzUOjT4xs5Nq&msg=ss');
    return client.replyMessage(event.replyToken, msg);
}
    
    
    
    
    app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
	
	//  });         //mongodb


