// init project
var express = require('express');
var app = express();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/failed", function (request, response) {
  response.sendFile(__dirname + '/views/failed.html');
});

var msg = {
  from: {name: 'Wife of Bard', email: 'glitch_send@sydoracle.com',},  
  to: {name: 'Story Lover', email: 'glitch_rcpt@sydoracle.com',},  
  subject: 'Enjoy your story from the Wife of bard',
  };

app.get("/send/:storyId", function (request, response) {
  msg.html = "<strong>The End of" + request.params.storyId + "'>click here</a>";
  console.log('Info:'+request.params.storyId+'.')
  switch (request.params.storyId) {
      case "Library":
          msg.templateId = "d82ba63c-98c3-4a61-811e-866d54e9a196";
          break; 
      case "Stones":
          msg.templateId = "586cd0c7-e05d-4f07-a396-94dc6df1a484";
          break; 
      default:
          break; 
  }
  if (typeof msg.templateId !== 'undefined') {
    sgMail.send(msg);
    response.sendFile(__dirname + '/views/sent.html');
  }
  else {
     // some variable (global or local) "v" is defined in the current scope
     // *and* it contains a value other than undefined
    response.sendFile(__dirname + '/views/failed.html');
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
