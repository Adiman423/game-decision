var path = require('path');
var express = require('express');
var app = express();
var request = require('request');
var steam_api = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
steam_api += "?key=My_Steam_Web_API_Key";
steam_api += "&format=json";  
var gameList = {};
var fs = require('fs');

// sets the default PORT where our app listens for incoming requests
app.set('port', (process.env.PORT || 5000));
app.use("/", express.static(__dirname + '/'));

// tell the server to respond with hello world at the root URL
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

request.get(steam_api, function(error, steamResponse, steamBody) {
  // request the complete list of games on steam from the steam web API
  var steamList = JSON.parse(steamBody);
  gameList = steamList["applist"]["apps"]; 
  // save the list of games on steam to a JSON file
  fs.writeFileSync('steamList.json',JSON.stringify(gameList));
  return gameList;
});

// writes to the command line what PORT our app is using
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});