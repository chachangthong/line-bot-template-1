    // Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/',function (req, res) {
    res.end("ok bot")
    })
app.post('/webhook', (req, res) => {
     var tex_t = req.body.events[0].message.text
     var sende_r = req.body.events[0].source.userId
     var replytoke_n = req.body.events[0].replyToken
    
    console.log("---0---");
    console.log(tex_t);
    
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
    res.end("ok")
})
app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {b316afc916aeae77f04c89988efabcda}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'ok'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        //console.log('status = ' + res.statusCode);
    });
}
