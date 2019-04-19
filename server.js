// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token)
    res.sendStatus(200)
    console.log("---0---");
    console.log(tex_t);
})
app.listen(port)
function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {C+oCzeM5fZhLng0L4c0evjDEZjF/EIDFKtR1Zgb3Mp3bT4OgeO2hB3x2tDPrILRqd2i0dO3htzvRV676dcTLV2wiaS29rfM26RIdDcvOBAJTjHrhlcsZPUeSrtAaQoS8AWRlN0RszPFWP6TfX7ZtsI9PbdgDzCFqoOLOYbqAITQ=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
       // console.log('status = ' + res.statusCode);
    });
}
