/*
* This code was adapted from a tutorial written by Adam Labi (AKA adamcadaver) which can be found below:
* https://github.com/adamcadaver/getting-started-web-dev-js/blob/master/STEPS.md
*/
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
igdb_releases += "&fields=name%2crating%2caggregated_rating%2crelease_dates%2calternative_names"
+ "%2ccover.cloudinary_id%2curl&limit=10&offset=0&order=release_dates.date%3Adesc";

if (navigator.userAgent.match(/IEMobile\/10\.0/)){
  var msViewportStyle = document.createElement('style');
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )  
  );
  document.querySelector('head').appendChild(msViewportStyle);
}

var app = angular.module('gameJudgement');
app.controller('recentReleasesCtrl',['$http','$scope',function($http,$scope){
    
    var ctrl = this;
    ctrl.newReleases = {};
    ctrl.steamList = {};
    
    ctrl.rightNow = timeInMs;
    ctrl.threeMonthsAgo = threeMonthsAgo;
    $http.defaults.headers.common['X-Mashape-Key'] = 'MY_IGDB_API_KEY';
    
    function releaseNameCleaner(){
      
      for(var i = 0; i < ctrl.steamList.length; i++){
        
        for(var j in ctrl.newReleases){
          
          if ( ctrl.newReleases[j]["name"].toLowerCase() == ctrl.steamList[i]["name"].toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if ( ctrl.newReleases[j]["name"].replace(": "," - ").toLowerCase() === ctrl.steamList[i]["name"].toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if ( ctrl.newReleases[j]["name"].replace(": "," ").toLowerCase() === ctrl.steamList[i]["name"].toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if ( ctrl.steamList[i]["name"].replace("_", " ").toLowerCase() === ctrl.newReleases[j]["name"].toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if ( ctrl.newReleases[j]["name"].replace("and","&").toLowerCase() == ctrl.steamList[i]["name"].toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if ( ctrl.steamList[i]["name"].replace("®","").toLowerCase() == ctrl.newReleases[j]["name"].toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if (ctrl.steamList[i]["name"].replace("\u2122","").toLowerCase() == ctrl.newReleases[j]["name"].toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if (ctrl.steamList[i]["name"].replace("\u2122","").toLowerCase() == ctrl.newReleases[j]["name"].replace(": ", " ").toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if (ctrl.steamList[i]["name"].replace("\u2122","").trim().toLocaleLowerCase() == ctrl.newReleases[j]["name"].replace(": ", " ").toLowerCase()){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
          
          else if ( ctrl.newReleases[j]["name"].toUpperCase() == ctrl.steamList[i]["name"]){
            
            ctrl.newReleases[j]["name"] = ctrl.steamList[i]["name"];
          }
        }
      }
    }
    
    $http.get('/steamList.json')
    .success(function(data, status, headers, config){
      
      ctrl.steamList = data;
      
      releaseNameCleaner();
    });
    
    var clickCounter = 0;
    
    
    $scope.getReleases = function(){
    
    
    clickCounter++;
    
    var formButtons = document.getElementById('form_buttons');
    
    var target = document.getElementById('target').value;
    
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
    
    var invalidGameName = document.getElementById('invalidGameName');
    
    if (search.value.length > 0){
      
    invalidGameName.innerHTML = search.value.length > 0 && clickCounter >= 1 ? "Game name is not needed for Recent Releases. Please leave it blank" : "";
      formButtons.innerHTML = '<a class="btn btn-primary" href="/">Try Again</a>';
      return;
    }
    
    if (clickCounter >= 1){
      formButtons.innerHTML = '<a class="btn btn-primary" href="/">Start over</a>';
    }
    
    $http({
      method: 'GET',
      headers: {
        'X-Mashape-Key': 'MY_IGDB_API_KEY',
        'Accept' : 'application/json',
      },
      url: igdb_releases
      // capture the response to the IGDB request in $scope.data
      // this contains the list of results from the search based on what the user entered
      }).success(function(data, status, headers, config) {

          ctrl.newReleases = data;
          releaseNameCleaner();
         
      });
    };
}]);
