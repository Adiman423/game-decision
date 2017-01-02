var path = require('path');
var express = require('express');
var app = express();
var request = require('request');
var schedule = require('node-schedule');
var fs = require('fs');

var steam_api = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
steam_api += "MY_STEAM_WEB_API_KEY";
steam_api += "&format=json";  
var gameList = {};


// sets the default PORT where our app listens for incoming requests
app.set('port', (process.env.PORT || 5000));
app.use("/", express.static(__dirname + '/'));

// tell the server to respond with hello world at the root URL
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

// Tell the server to reply to any request for /about with about.html
app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/about.html'));
});

/*
Fetch a new list of steam games every hour at 30 minutes past the hour. 
*/
var rule = new schedule.RecurrenceRule();
rule.minute = 30;


var fetchNewGameList = schedule.scheduleJob(rule,function(){

/*
Adapted from a blog post by Christopher Jones on CodePen:
https://codepen.io/johnchristopherjones/post/how-do-i-use-the-steam-api-in-my-web-app
*/
  request.get(steam_api, function(error, steamResponse, steamBody) {
    // request the complete list of games on steam from the steam web API
    var steamList = JSON.parse(steamBody);
    gameList = steamList["applist"]["apps"]; 
    // save the list of games on steam to a JSON file
    fs.writeFileSync('steamList.json',JSON.stringify(gameList));
    return gameList;
  });  
  
  console.log("we have fetched a new game list");
});

// writes to the command line what PORT our app is using
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});