var linebot = require('linebot');
const express = require('express')
const bodyParser = require('body-parser');
const http = require('http');
var request = require('request');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
//const functions = require("firebase-functions");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://db-changthong.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "my-service-worker"
  }
});



var db = admin.database();
var ref = db.ref("/datadb");
ref.once("value", function(snapshot) {
  //console.log(snapshot.val());
});


const app = express();

var users=[];

var bot = linebot({
  channelId: "1566203051",
  channelSecret: "b316afc916aeae77f04c89988efabcda",
  channelAccessToken: "3ElmV4hWhjHccuz34k3WUfm6MgrU3BmEkfYLIuPsfx/umpaLjWeLBXiXmGDAFgE+d2i0dO3htzvRV676dcTLV2wiaS29rfM26RIdDcvOBAKTDEVc2oavzhgZF5nApE/NGkuc81tGAKdq+ubskwLQS1GUYhWQfeY8sLGRXgo3xvw="
});


app.listen(process.env.PORT || 80, function () {
  console.log('LineBot is running.');
});

const linebotParser = bot.parser();

app.post('/webhook', linebotParser);


bot.on('message', function (event) {
var msg = event.message.text;  

var messages;
var messagesPoint;
var pointU;

//console.log(event);  //ปริ้นค่าทั้งหมด
  if (msg === "แต้มสะสมช้างทอง"){
    
    //event.reply(messages)
    
    getDisplayName(event);
     setTimeout(function() {
      
           
          
    
//messages = {'type': 'text','text': "ไม่มีข้อมูล55555555",}          
ref.once("value", function(snapshot) {
  
  pointU = snapshot.child(event.source.userId).child("point").val();
	if (pointU == null) {
messages = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
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
      "contents": [
        {
          "type": "text",
          "text": "Changthong Point",
          "size": "xl",
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
                  "text": "คะแนนทั้งหมด",
                  "flex": 5,
                  "size": "sm",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": "ยังไม่มีข้อมูลนี้",
                  "flex": 5,
                  "size": "sm",
                  "color": "#666666",
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
                  "flex": 5,
                  "size": "sm",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": "ยังไม่มีข้อมูลนี้",
                  "flex": 5,
                  "size": "sm",
                  "color": "#666666",
                  "wrap": true
                }
              ]
            },{
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "คะแนนทั้งหมด",
                  "flex": 5,
                  "size": "sm",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": "ยังไม่มีข้อมูลนี้",
                  "flex": 5,
                  "size": "sm",
                  "color": "#666666",
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
	  console.log(pointU);
    console.log("ไม่มีข้อมูล");
sendMessage(event,messages);    
    }else { //มีข้อมูลแล้ว
var point1;
var point2;
var point3;    
    point1 = pointU;
	  point2 = 00;
	  point3 = 00;
messages = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
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
      "contents": [
        {
          "type": "text",
          "text": "Changthong Point",
          "size": "xl",
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
                  "text": "คะแนนทั้งหมด",
                  "flex": 5,
                  "size": "sm",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": pointU,
                  "flex": 5,
                  "size": "sm",
                  "color": "#666666",
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
                  "flex": 5,
                  "size": "sm",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": "-----",
                  "flex": 5,
                  "size": "sm",
                  "color": "#666666",
                  "wrap": true
                }
              ]
            },{
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "คะแนนทั้งหมด",
                  "flex": 5,
                  "size": "sm",
                  "color": "#AAAAAA"
                },
                {
                  "type": "text",
                  "text": "-----",
                  "flex": 5,
                  "size": "sm",
                  "color": "#666666",
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
    console.log(pointU);
    console.log("OK Data");
    //messages = {'type': 'text','text': pointU,}
sendMessage(event,messages);
}
})
  }, 1000);

}






else if (msg === 'สูตรชงเครื่องดื่ม') {
        messages ={
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
sendMessage(event,messages);
    }else {
































////////////////////////////////////////////////////////////  //////////////////////////////  //////////////////////////////  
sendMessage(event,msg);
//event.reply(event.message.text)
  var showLog = "{ UserID : "+event.source.userId +" , " + "msg : "  + msg + "}"
  console.log(showLog);
    }
////////////////////////////////////////////////////////////  //////////////////////////////  //////////////////////////////    
});


 

function getDisplayName(eve,msg){
   bot.getUserProfile(eve.source.userId);
   eve.source.profile().then(function (profile) {

      
      var data = { 
          name: profile.displayName,		
        }   
  
      ref.child(eve.source.userId).update(data, function(err) {
        if (err) {
            //ref.push(data) ลงข้อมูลไม่ได้ มีปัญหา
            } else {
            //ลงข้อมูลได้  
         }
      });
      console.log(profile.displayName);
      event.reply(event + JSON.stringify(event));
      //users[eve.source.userId].replies[0]=profile.displayName;
   }).catch(function (error) {
       // error 
   });
}




function sendMessage(eve,msg){
   eve.reply(msg).then(function(data) {
      // success 
      return true;
   }).catch(function(error) {
      // error 
      return false;
   });
}




function getPoint(eve,msg){
    bot.getUserProfile(eve.source.userId);
   eve.source.profile().then(function (profile) { 
 var data = { 
          name: profile.displayName,		
        }  
        
ref.once("value", function(snapshot) {
  var pointU = snapshot.child(eve.source.userId).child("point").val();
	if (pointU == null) {
    console.log("ไม่มีข้อมูล --  ลงใหม่");
       //ไม่มี ให้ลงข้อมูล
ref.child(eve.source.userId).update(data, function(err){
        if (err) {
   console.log("ok"); 
   console.log(err); 
  //ref.push(data) ลงข้อมูลไม่ได้ มีปัญหา
            } else {
   console.log("ok222");            
  //ลงข้อมูลได้  
        }
});
    } else { //มีข้อมูลแล้ว
    console.log(pointU);
    console.log("up");
var msgTEST = {
        type: 'text',
        text: '1'
        
    };
//sendMessage(event,msgTEST);    
    
  }
});  


}).catch(function (error) {
       // error 
   });



}
///////////////////-+-+-+-+


