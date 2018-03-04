// server.js
// where your node app starts


// init project
var express = require('express');
var app = express();
var helper = require('sendgrid').mail;
var fromEmail = new helper.Email('glitchsm@sydoracle.com');
var toEmail = new helper.Email('glitchtest@sydoracle.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(fromEmail, subject, toEmail, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

if(process.env.SENDGRID_API_KEY){
  console.log('Sending');
  //sg.API(request, function (error, response) {
  //  if (error) {
  //    console.log('Error response received');
  //  }
  //  console.log(response.statusCode);
  //  console.log(response.body);
  //  console.log(response.headers);
  //});
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
