// A request to the Internet Game Database (IGDB) API for game data
var igdb_api = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/";

// We shall fetch the game name, press rating, IGDB user rating, release
igdb_api += "?fields=name%2crating%2caggregated_rating%2crelease_dates.platform"
+ "%2ccover.cloudinary_id&limit=10&offset=0%3Adesc&search=";

// Get the current date and time in milliseconds 
var timeInMs = Date.now();

// Get the date from three months ago
var threeMonthsAgo = timeInMs - 7776000000;

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


// Building the query for recent releases
var igdb_releases = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/";

// Filter so that the response comes back with games released between today and three months ago
igdb_releases += "?filter%5Brelease_dates.date%5D%5Blte%5D=" + timeInMs
+ "&filter%5Brelease_dates.date%5D%5Bgte%5D=" + threeMonthsAgo
+ "&filter%5Brelease_dates.platform%5D%5Beq%5D=6"

/*
Get the game name, press rating, player rating, release info
order by release date with most recent at the top
*/
+"&fields=name%2crating%2caggregated_rating%2crelease_dates"
+ "%2ccover.cloudinary_id&limit=10&offset=0&order=release_dates.date%3Adesc";

// the start of our gameSearch module 
angular.module('gameSearch', [])
.controller('gameSearchController', ['$http','$scope','$filter', function ($http, $scope){
  
  $scope.games = {};
  $scope.gameList = [];
  $http.defaults.headers.common['X-Mashape-Key'] = 'MY_IGDB_API_KEY';
  
  //take the user's entry and parse it as an int
  $scope.target= parseInt(document.getElementById('target').value,10);
  
  if (!$scope.target){
    $scope.target = 75;
  }
  
  $scope.search = function (search){
    
    /* request the list of games on steam from the JSON file on the node server
    *  and store it in $scope.steamList
    */
    $scope.target= parseInt(document.getElementById('target').value,10);
    if (!$scope.target){
      $scope.target = 75;
    }
    
    igdb_api += document.getElementById('search').value; 
    
    
    $http.get('/steamList.json')
    .success(function(data){
      
      $scope.gameList = data;
    });
  
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
      
      for(var i in $scope.gameList){
        for(var j in $scope.games){
          
          if ( $scope.games[j]["name"].toLowerCase() == $scope.gameList[i]["name"].toLowerCase()){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
            console.log("replaces colon with nothing");
            console.log($scope.gameList[i]["name"]);
          }
          
          else if ( $scope.games[j]["name"].replace(": "," ").toLowerCase() === $scope.gameList[i]["name"].toLowerCase()){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
            console.log("replaces colon with nothing");
            console.log($scope.gameList[i]["name"]);
          }
          
          else if ($scope.games[j]["name"].replace(": "," - ").toLowerCase() === $scope.gameList[i]["name"].toLowerCase()){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
            console.log("replaces colon with dash");
            console.log($scope.gameList[i]["name"]);
          }
          
          else if ($scope.games[j]["name"].replace("and","&") == $scope.gameList[i]["name"]){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
            console.log("replace ampersand");
            console.log($scope.gameList[i]["name"]);
          }
          
          else if ($scope.gameList[i]["name"].replace("_"," ") === $scope.games[j]["name"]){
            
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
            console.log("adds an underscore");
            console.log($scope.gameList[i]["name"]);
          }
          
          else if ( $scope.games[j]["name"].toUpperCase() == $scope.gameList[i]["name"]){
           
            $scope.games[j]["name"] = $scope.gameList[i]["name"];
            console.log("uppercased string");
          }
        }
      }
    });
  };
}]);
