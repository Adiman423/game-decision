var path = require('path');
var express = require('express');
var app = express();

// sets the default PORT where our app listens for incoming requests
app.set('port', (process.env.PORT || 5000));
app.use("/", express.static(__dirname + '/'));

// tell the server to respond with hello world at the root URL
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// writes to the command line what PORT our app is using
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});