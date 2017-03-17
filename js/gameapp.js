/*
* This code was adapted from a tutorial written by adamcadaver which can be found below:
* https://github.com/adamcadaver/getting-started-web-dev-js/blob/master/STEPS.md
*/
var timeInMs = Date.now();
// A request to the Internet Game Database (IGDB) API for game data
var igdb_api = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/";
igdb_api += "?filter%5Brelease_dates.platform%5D%5Beq%5D=6";

// We shall fetch the game name, press rating, IGDB user rating, release
igdb_api += "&fields=name%2crating%2caggregated_rating%2crelease_dates"
+ "%2curl%2calternative_names%2ccover.cloudinary_id&limit=10&offset=0%3Adesc&search=";


/* Check for a phone running Internet Explorer 10
Taken from http://getbootstrap.com/getting-started/#support-ie10-width
*/
if (navigator.userAgent.match(/IEMobile\/10\.0/)){
  var msViewportStyle = document.createElement('style');
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )  
  );
  document.querySelector('head').appendChild(msViewportStyle);
}

// the start of our gameSearch module 
var gameSearchApp = angular.module('gameJudgement',[]);
gameSearchApp.controller('gameSearchCtrl', ['$http','$scope', function ($http, $scope){
  
  var searchctrl = this;
  searchctrl.rightNow = timeInMs;
  searchctrl.games = [];
  searchctrl.steamList = [];
  
  searchctrl.altNameChecker = function(){
    
    var counter = 0;
    
    for (var i = 0; i < searchctrl.steamList.length; i++){
      
      for (var j = 0; j < searchctrl.games.length; j++){
          
        if( (searchctrl.games[j].alternative_names != null)){
        
          for(var k = 0; k < searchctrl.games[j].alternative_names.length; k++){
            
            if(searchctrl.games[j].alternative_names[k].name == searchctrl.steamList[i]["name"]){
              counter++;
            }
          }
        }
      }
    }
    return counter;
  };
  
  searchctrl.gameNameCleaner = function(){
    /* A function whose purpose is
    Compare the game names from the internet game database (IGDB) and the Steam store. 
    Compare them and if they are close enough to being a match,
      Overwrite the game name from IGDB with the correct name from the steam store. 
    */
    
      for(var i = 0; i < searchctrl.steamList.length; i++){
        
        for(var j = 0; j < searchctrl.games.length; j++){
          
          if ( searchctrl.games[j]["name"].toLowerCase() == searchctrl.steamList[i]["name"].toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          else if ( searchctrl.games[j]["name"].toLowerCase() == searchctrl.steamList[i]["name"].trim().toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if ( searchctrl.games[j]["name"].replace(": "," ").toLowerCase() === searchctrl.steamList[i]["name"].toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if (searchctrl.games[j]["name"].replace(": "," - ").toLowerCase() === searchctrl.steamList[i]["name"].toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if (searchctrl.games[j]["name"].replace("and","&") == searchctrl.steamList[i]["name"]){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if ((searchctrl.steamList[i]["name"].replace("_"," ") === searchctrl.games[j]["name"]) && searchctrl.altNameChecker() == 0){
              searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];

          }
          
          else if (searchctrl.steamList[i]["name"].replace("®","").replace("\u2122","").toLowerCase() == searchctrl.games[j]["name"].toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if (searchctrl.steamList[i]["name"].replace("®","").toLowerCase() == searchctrl.games[j]["name"].toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if (searchctrl.steamList[i]["name"].replace("\u2122","").toLowerCase() == searchctrl.games[j]["name"].toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if (searchctrl.steamList[i]["name"].replace("\u2122","").toLowerCase().trim() == searchctrl.games[j]["name"].toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if (searchctrl.steamList[i]["name"].replace("\u2122","").toLowerCase() == searchctrl.games[j]["name"].replace(": "," ").toLowerCase()){
            
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
          
          else if ( searchctrl.games[j]["name"].toUpperCase() == searchctrl.steamList[i]["name"]){
           
            searchctrl.games[j]["name"] = searchctrl.steamList[i]["name"];
          }
        }
      }
    };
  
   $http.get('/steamList.json')
    .success(function(data, status, headers, config){
      
      searchctrl.steamList = data;
      
      searchctrl.gameNameCleaner();
    });
  
  searchctrl.clickCounter = 0; 
  
  $scope.search = function (game){
  searchctrl.clickCounter++;
    game = document.getElementById('game').value;

    if (!$scope.target){
      $scope.target = 75;
    }
    
    igdb_api += document.getElementById('game').value;
    
    // make a call to the IGDB API and authenticate with an API KEY
    $http.get(igdb_api, {
      headers: {
        'X-Mashape-Key': 'MY_IGDB_API_KEY',
        'Accept' : 'application/json',
      }
      
    // capture the response to the IGDB request in $scope.data
    // this contains the list of results from the search based on what the user entered
    }).success(function(data, status, headers, config){

        searchctrl.games = data;
        searchctrl.gameNameCleaner();
    });
    
  };
}]);