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
  searchctrl.games = {};
  searchctrl.steamList = [];
  $http.defaults.headers.common['X-Mashape-Key'] = 'MY_IGDB_API_KEY';
  
  //take the user's entry and parse it as an int
  $scope.target= parseInt(document.getElementById('target').value,10);
  
  if (!$scope.target){
    $scope.target = 75;
  }
  
  function altNameChecker(){
    
    var counter = 0;
    
    for (var i = 0; i < searchctrl.steamList.length; i++){
      
      for (var j = 0; j < searchctrl.games.length; j++){
          
        if( (searchctrl.games[j].alternative_names != null)){
        
          for(var k = 0; k < searchctrl.games[j].alternative_names.length; k++){
            
            if(searchctrl.games[j].alternative_names[k].name == searchctrl.steamList[i]["name"]){
              counter++;
              console.log("matched an alt name");
            }
          }
        }
      }
    }
    if (counter == 0){
      
      console.log("no match found");
    }
    return counter;
  }
  
  function gameNameCleaner(){
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
          
          else if ((searchctrl.steamList[i]["name"].replace("_"," ") === searchctrl.games[j]["name"])
          && altNameChecker() == 0){
            
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
    }
  
   $http.get('/steamList.json')
    .success(function(data, status, headers, config){
      
      searchctrl.steamList = data;
      
      gameNameCleaner();
    });
   
  var clickCounter = 0;
  
  $scope.search = function (search){
    
    clickCounter++;

    var formButtons = document.getElementById('form_buttons');
    
    if(clickCounter >= 1){
      formButtons.innerHTML= '<a class="btn btn-primary" href="/">Start Over</a>';
    }
    
    var invalidGameName = document.getElementById('invalidGameName');
    search = document.getElementById('search').value;
    var isAlphaNumeric = function(str){
      // a to function check if the user only entered letters or numbers in their search query
      /*
      * Adapted from: 
      * http://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
      */
      var code, i, len;
      
      for( i = 0, len = str.length; i < len; i++){
        code = str.charCodeAt(i);
        if(!(code > 47 && code < 58) && //numeric
        !(code > 64 && code < 91 ) && // uppercase letters
        !(code > 96 && code < 123) && // lowercase letters
        // foreign language characters
        !(code >= 128 && code <= 155) && 
        !(code == 157) && 
        !(code == 58) &&
        !(code == 38) &&
        !(code == 39) &&
        !(code == 95) &&
        !(code == 45) &&
        !(code >= 160 && code <= 165) &&
        !(code >= 181 && code <= 183) &&
        !(code == 198 && code == 199) &&
        !(code >= 208 && code <= 212) &&
        !(code >= 214 && code <= 216) &&
        !(code >= 224 && code <= 229) &&
        !(code >= 233 && code <= 237) &&
        !(code == 32)){
          
          return false;
        }
      }
      return true;
    };
    
    if( isAlphaNumeric(search) == false || search.length > 140){
      
      invalidGameName.innerHTML = "The game name you entered was too long or invalid.";
      formButtons.innerHTML = '<a class="btn btn-primary" href="/">Try Again</a>';
      return;
    }
    
    if(search.length == 0){
      invalidGameName.innerHTML = "You did not enter a game to search for!";
      formButtons.innerHTML = '<a class="btn btn-primary" href="/">Try Again</a>';
      return;
    }
    
    var target = document.getElementById('target').value;
    /*
    Adapted from a post on W3Resource: 
    http://www.w3resource.com/javascript/form/all-numbers.php
    */
    var numbers = /^[0-9]+$/;
    var invalidNumber = document.getElementById('invalidNumber');
    
    if(!target.match(numbers) && target.length != 0){
      invalidNumber.innerHTML = "You did not type in a number.";
      formButtons.innerHTML = '<a class="btn btn-primary" href="/">Try Again</a>';
      return;
    }
    
    $scope.target = parseInt(target,10);
    
    if (!$scope.target){
      $scope.target = 75;
    }
    
    if (($scope.target < 0) ||($scope.target >= 101)){
      
      invalidNumber.innerHTML = "Your threshold must be between 1 and 100";
      formButtons.innerHTML = '<a class="btn btn-primary" href="/">Try Again</a>';
      return;
    }
    
    igdb_api += document.getElementById('search').value;
    
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
        gameNameCleaner();
    });
    
  };
}]);
