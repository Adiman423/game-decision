// A request to the Internet Game Database (IGDB) API for game data
var igdb_api = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/";

// We shall fetch the game name, press rating, IGDB user rating, release
igdb_api += "?fields=name%2crating%2caggregated_rating%2crelease_dates.platform"
+ "%2ccover.cloudinary_id&limit=10&offset=0%3Adesc&search=";

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
angular.module('gameSearch', [])
.controller('gameSearchController', ['$http','$scope', function ($http, $scope){
  
  $scope.games = {};
  $scope.gameList = [];
  $scope.cleanedGameNames = [];
  $scope.newReleases = {};
  $http.defaults.headers.common['X-Mashape-Key'] = 'MY_IGDB_API_KEY';
  
  //take the user's entry and parse it as an int
  $scope.target= parseInt(document.getElementById('target').value,10);
  
  if (!$scope.target){
    $scope.target = 75;
  }
  
  function gameNameCleaner(){
      for(var i = 0; i < $scope.gameList.length; i++){
        
        for(var j = 0; j < $scope.games.length; j++){
          
          if ( $scope.games[j]["name"].toLowerCase() == $scope.gameList[i]["name"].toLowerCase()){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
          
          else if ( $scope.games[j]["name"].replace(": "," ").toLowerCase() === $scope.gameList[i]["name"].toLowerCase()){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
          
          else if ($scope.games[j]["name"].replace(": "," - ").toLowerCase() === $scope.gameList[i]["name"].toLowerCase()){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
          
          else if ($scope.games[j]["name"].replace("and","&") == $scope.gameList[i]["name"]){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
          
          else if ($scope.gameList[i]["name"].replace("_"," ") === $scope.games[j]["name"]){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
          
          else if ($scope.gameList[i]["name"].replace("®","") == $scope.games[j]["name"]){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
          
          else if ($scope.gameList[i]["name"].replace("\u2122","").toLowerCase() == $scope.games[j]["name"].toLowerCase()){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
          
          else if ($scope.gameList[i]["name"].replace("\u2122","").toLowerCase() == $scope.games[j]["name"].replace(": "," ").toLowerCase()){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
          
          else if ( $scope.games[j]["name"].toUpperCase() == $scope.gameList[i]["name"]){
           
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
          }
        }
      }
    }
  
   $http.get('/steamList.json')
    .success(function(data, status, headers, config){
      
      $scope.gameList = data;
      gameNameCleaner();
   });
  
  $scope.search = function (search){
    
    /* request the list of games on steam from the JSON file on the node server
    *  and store it in $scope.steamList
    */
    $scope.target= parseInt(document.getElementById('target').value,10);
    if (!$scope.target){
      $scope.target = 75;
    }
    
    igdb_api += document.getElementById('search').value;
    /* A function whose purpose is
    Compare the game names from the internet game database (IGDB) and the Steam store. 
    Compare them and if they are close enough to being a match,
      Overwrite the game name from IGDB with the correct name from the steam store. 
    */
  
    // make a call to the IGDB API and authenticate with an API KEY
    $http.get(igdb_api, {
      headers: {
        'X-Mashape-Key': 'MY_IGDB_API_KEY',
        'Accept' : 'application/json',
      }
      
    // capture the response to the IGDB request in $scope.data
    // this contains the list of results from the search based on what the user entered
    }).success(function(data, status, headers, config){
      
      $scope.games = data;
      gameNameCleaner();
    });
  };
}]);
