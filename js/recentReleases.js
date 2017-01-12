// Get the current date and time in milliseconds
var timeInMs = Date.now();

// Get the date from three months ago
var threeMonthsAgo = timeInMs - 7776000000;


// Building the query for recent releases
var igdb_releases = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/";

// Filter so that the response comes back with games released between today and three months ago
igdb_releases += "?filter%5Brelease_dates.date%5D%5Blte%5D=" + timeInMs
+ "&filter%5Brelease_dates.date%5D%5Bgte%5D=" + threeMonthsAgo
+ "&filter%5Brelease_dates.platform%5D%5Beq%5D=6";

/*
Get the game name, press rating, player rating, release info
order by release date with most recent at the top
*/
igdb_releases += "&fields=name%2crating%2caggregated_rating%2crelease_dates"
+ "%2ccover.cloudinary_id&limit=10&offset=0&order=release_dates.date%3Adesc";


if (navigator.userAgent.match(/IEMobile\/10\.0/)){
  var msViewportStyle = document.createElement('style');
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )  
  );
  document.querySelector('head').appendChild(msViewportStyle);
}

angular.module('gameApp').controller('RecentReleasesCtrl',['$http',function RecentReleasesCtrl($http){
    
    this.newReleases= {};
    this.gameList = [];
    $http.defaults.headers.common['X-Mashape-Key'] = 'MY_IGDB_API_KEY';
    
    function releaseNameCleaner(){
        
      for(var i = 0; i < this.gameList.length; i++){
        
        for(var j = 0; j < this.newReleases.length; j++){

          if ( this.newReleases[j]["name"].toLowerCase() == this.gameList[i]["name"].toLowerCase()){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }

          else if ( this.newReleases[j]["name"].replace(": "," ").toLowerCase() === this.gameList[i]["name"].toLowerCase()){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }

          else if (this.newReleases[j]["name"].replace(": "," - ").toLowerCase() === this.gameList[i]["name"].toLowerCase()){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }

          else if (this.newReleases[j]["name"].replace("and","&") == this.gameList[i]["name"]){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }

          else if (this.gameList[i]["name"].replace("_"," ") === this.newReleases[j]["name"]){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }

          else if (this.gameList[i]["name"].replace("®","") == this.newReleases[j]["name"]){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }

          else if (this.gameList[i]["name"].replace("\u2122","").toLowerCase() == this.newReleases[j]["name"].toLowerCase()){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }

          else if (this.gameList[i]["name"].replace("\u2122","").toLowerCase() == this.newReleases[j]["name"].replace(": "," ").toLowerCase()){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }
          else if (this.gameList[i]["name"].replace("\u2122","").toLowerCase().trim() == this.newReleases[j]["name"].replace(": "," ").toLowerCase()){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }

          else if ( this.newReleases[j]["name"].toUpperCase() == this.gameList[i]["name"]){

            this.newReleases[j]["name"] = this.gameList[i]["name"];
          }
        }
      }
    }
    
    $http.get('/steamList.json')
    .success(function(data, status, headers, config){

      this.gameList = data;
      releaseNameCleaner();
    });
    
    this.recentReleases = function(){
      
      this.target= parseInt(document.getElementById('target').value,10);
      if (!this.target){
        this.target = 75;
      }
      
      $http.get(igdb_releases, {
        headers: {
          'X-Mashape-Key': 'MY_IGDB_API_KEY',
          'Accept' : 'application/json',
        }
      
      // capture the response to the IGDB request in $scope.data
      // this contains the list of results from the search based on what the user entered
      }).success(function(data, status, headers, config){
      
        this.newReleases = data;
        releaseNameCleaner();
      });  
    };
}]);