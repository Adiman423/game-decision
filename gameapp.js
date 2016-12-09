// let's build the URL to send our query to
var igdb_api = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/";
igdb_api += "?fields=name%2crating%2caggregated_rating%2crelease_dates.platform%2ccover.cloudinary_id&limit=12&offset=0%3Adesc&search=";

var steam_api = "https://api.steampowered.com/ISteamApps/GetAppList/v2";
steam_api += "?key=My_Steam_Web_API_Key";
steam_api += "&format=json";

// the start of our gameSearch module 
angular.module('gameSearch', [])
.controller('gameSearchController', ['$http','$scope', function ($http, $scope){
  //start up the $http service and the $scope service
  $scope.games = {};
  
  $http.defaults.headers.common['X-Mashape-Key'] = 'My_Masape_IGDB_APIKEY';
  
  $scope.search = function (search){
    //take the user's entry and parse it as an int
    $scope.target= parseInt(document.getElementById('target').value,10);
    if (!$scope.target){
      $scope.target = 75;
    }

    /* request the list of games on steam from the JSON file on the node server
    *  and store it in $scope.steamList
    */
    $http.get('/steamList.json')
    .success(function(data){
      
      $scope.gameList = data;
    });
    
    igdb_api += document.getElementById('search').value; 
    var gameQuery = document.getElementById('search').value;
    
    // make a call to the IGDB API and authenticate with my API Key
    $http.get(igdb_api, {
     
      headers: {
        'X-Mashape-Key': 'My_Masape_IGDB_APIKEY',
        'Accept' : 'application/json',
        
      }
    
    // capture the response to the IGDB request in $scope.data
    // this contains the list of results from the search based on what the user entered
    }).success(function(data, status, headers, config){
      $scope.games = data;
      
    });
  };
}]);
