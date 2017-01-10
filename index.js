var path = require('path');
var express = require('express');
var app = express();
var request = require('request');
var schedule = require('node-schedule');
var fs = require('fs');
var compression = require('compression');

var steam_api = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
steam_api += "?key=MY_STEAM_WEB_API_KEY";
steam_api += "&format=json";  

// sets the default PORT where our app listens for incoming requests
app.use(compression());
app.set('port', (process.env.PORT || 5000));
app.use("/", express.static(__dirname + '/'));
app.set('view cache',true);

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
var gameList = {};

var fetchNewGameList = schedule.scheduleJob(rule,function(){

/*
Adapted from a blog post by Christopher Jones on CodePen:
https://codepen.io/johnchristopherjones/post/how-do-i-use-the-steam-api-in-my-web-app
*/
  request.get(steam_api, function(error, steamResponse, steamBody) {

    // request the complete list of games on steam from the steam web API
    var steamList = JSON.parse(steamBody);
    gameList = steamList["applist"]["apps"];
    /*
    Find a keyword from a listing that is not required and if found, delete from the JSON. 
    adapted from: 
    http://stackoverflow.com/questions/15451290/remove-element-from-json-object
    and 
    http://stackoverflow.com/questions/9675856/javascript-array-splice-does-not-remove-element-in-the-array
    */
    for(var i = 0; i < gameList.length; i++){
      
      if((gameList[i]["name"].indexOf(" Soundtrack") !== -1) || (gameList[i]["name"].indexOf(" soundtrack") !== -1)){
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("DLC Quest") !== -1){
        continue;
      }
      else if(gameList[i]["name"].indexOf("PEGI") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if((gameList[i]["name"].indexOf(" Trailer") !== -1) || (gameList[i]["name"].indexOf("trailer") !== -1)){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Teaser") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Robotpencil") !== -1){

        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Multiplayer") !== -1){

        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Starter Pack") !== -1){

        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Season Pass") !== -1){

        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Editor") !== -1){

        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" OST") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Modeling") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("CD Key") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("- Demo") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Demo") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Gameplay") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Artbook") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Dedicated Server") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Beta") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Activation") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Skin") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("ESRB") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Addon") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("AddOn") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Costume") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      
      else if(gameList[i]["name"].indexOf("Costume Pack") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Map Pack") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Art Book") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Community") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Add-On") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("ValveTestApp") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" DLC") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("DLC") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Bundle") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Unlock") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf(" Expansion") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Drawing Course") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Song Pack") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Uplay") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Bonus") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Package") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Strategy Guide") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
      else if(gameList[i]["name"].indexOf("Downloadable Content") !== -1){
        
        gameList.splice(i,1);
        i--;
      }
    }
    // save the list of games on steam to a JSON file
    fs.writeFile('steamList.json',JSON.stringify(gameList), (err) =>{
      
      if(err){
        throw err;
      }
      console.log("we have fetched a new game list");
    });
    return gameList;
  });
});

// writes to the command line what PORT our app is using
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});