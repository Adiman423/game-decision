// let's build the URL to send our query to
var igdb_api = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/";
igdb_api += "?fields=name%2crating%2caggregated_rating%2crelease_dates.platform%2ccover.cloudinary_id&limit=10&offset=0%3Adesc&search=";

// the start of our gameSearch module 
angular.module('gameSearch', [])

//start up the $http service and the $scope service
.controller('gameSearchController', ['$http','$scope', function ($http, $scope){
  $scope.games = {};
  $http.defaults.headers.common['X-Mashape-Key'] = 'my_IGDB_API_Key';
  
  $scope.search = function (search){
    igdb_api += document.getElementById('search').value; 
    var gameQuery = document.getElementById('search').value;
    
    // make a call to the IGDB API and authenticate with my API Key
    $http.get(igdb_api, {
     
      headers: {
        'X-Mashape-Key': 'my_IGDB_API_Key',
        'Accept' : 'application/json'
      }
    
    // capture the response to the request in $scope  
    }).success(function(data, status, headers, config){
      $scope.games = data;
      console.log("search: " + document.getElementById('search').value);
      // for(var i in data)
      // {
      //     console.log("game " + i +": " + data[i].name);
      // }
    });
  };
}]);
