describe('recentReleasesCtrl',function(){
    
    var $httpBackend, $rootScope, createController, requestHandler, releaseArray, $scope;
    
    releaseArray = [
    {"id":359,"name":"Final Fantasy XV","url":"https://www.igdb.com/games/final-fantasy-xv","rating":79.9765608403094,"release_dates":[{"category":0,"platform":49,"date":1480377600000,"human":"2016-Nov-29","y":2016,"m":11},{"category":0,"platform":48,"date":1480377600000,"human":"2016-Nov-29","y":2016,"m":11},{"category":2,"platform":6,"date":1546214400000,"human":"2018","y":2018,"m":12}],"cover":{"cloudinary_id":"exzxitwgvhwzric1byej"}},
    {"id":13171,"name":"Read Only Memories","url":"https://www.igdb.com/games/read-only-memories","rating":99.2611637639798,"aggregated_rating":82.0,"release_dates":[{"category":0,"platform":72,"date":1405209600000,"region":8,"human":"2014-Jul-13","y":2014,"m":7},{"category":0,"platform":6,"date":1444089600000,"region":8,"human":"2015-Oct-06","y":2015,"m":10},{"category":0,"platform":14,"date":1444089600000,"region":8,"human":"2015-Oct-06","y":2015,"m":10},{"category":0,"platform":3,"date":1444089600000,"region":8,"human":"2015-Oct-06","y":2015,"m":10},{"category":0,"platform":92,"date":1444089600000,"region":8,"human":"2015-Oct-06","y":2015,"m":10},{"category":0,"platform":48,"date":1484611200000,"region":8,"human":"2017-Jan-17","y":2017,"m":1},{"category":2,"platform":46,"date":1514678400000,"region":8,"human":"2017","y":2017,"m":12}],"cover":{"cloudinary_id":"vxkifkekdswgaeoa3agm"}},
    {"id":6879,"name":"Space Hulk: Deathwing","url":"https://www.igdb.com/games/space-hulk-deathwing","aggregated_rating":59.8571428571429,"release_dates":[{"category":2,"platform":49,"date":1514678400000,"region":8,"human":"2017","y":2017,"m":12},{"category":2,"platform":48,"date":1514678400000,"region":8,"human":"2017","y":2017,"m":12},{"category":0,"platform":6,"date":1481673600000,"region":8,"human":"2016-Dec-14","y":2016,"m":12}],"cover":{"cloudinary_id":"jkxacpun6pxy4wkftye1"}},
    {"id":11180,"name":"Robinson: The Journey","url":"https://www.igdb.com/games/robinson-the-journey","aggregated_rating":60.5714285714286,"release_dates":[{"category":0,"platform":48,"date":1478563200000,"region":2,"human":"2016-Nov-08","y":2016,"m":11},{"category":0,"platform":48,"date":1478649600000,"region":1,"human":"2016-Nov-09","y":2016,"m":11},{"category":2,"platform":6,"date":1514678400000,"human":"2017","y":2017,"m":12},{"category":0,"platform":48,"date":1480550400000,"region":5,"human":"2016-Dec-01","y":2016,"m":12}],"cover":{"cloudinary_id":"ag45mlr80vtsfi8donre"}},
    {"id":19554,"name":"Steep","url":"https://www.igdb.com/games/steep","aggregated_rating":73.125,"release_dates":[{"category":0,"platform":49,"date":1480636800000,"human":"2016-Dec-02","y":2016,"m":12},{"category":0,"platform":48,"date":1480636800000,"human":"2016-Dec-02","y":2016,"m":12},{"category":0,"platform":6,"date":1480636800000,"human":"2016-Dec-02","y":2016,"m":12},{"category":2,"platform":130,"date":1514678400000,"human":"2017","y":2017,"m":12}],"cover":{"cloudinary_id":"hwan8wag6ype4xpiu1gv"}},
    {"id":19457,"name":"The Elder Scrolls V: Skyrim Special Edition","url":"https://www.igdb.com/games/the-elder-scrolls-v-skyrim-special-edition","rating":87.6907315930151,"aggregated_rating":82.0,"release_dates":[{"category":2,"platform":130,"date":1514678400000,"human":"2017","y":2017,"m":12},{"category":0,"platform":48,"date":1477612800000,"region":8,"human":"2016-Oct-28","y":2016,"m":10},{"category":0,"platform":49,"date":1477612800000,"region":8,"human":"2016-Oct-28","y":2016,"m":10},{"category":0,"platform":6,"date":1477612800000,"region":8,"human":"2016-Oct-28","y":2016,"m":10}],"cover":{"cloudinary_id":"fbwtoie90jibxgkrf6mx"}},
    {"id":19085,"name":"Shadow Tactics: Blades of the Shogun","url":"https://www.igdb.com/games/shadow-tactics-blades-of-the-shogun","rating":88.7952510977596,"aggregated_rating":85.4444444444444,"release_dates":[{"category":2,"platform":48,"date":1514678400000,"region":8,"human":"2017","y":2017,"m":12},{"category":2,"platform":49,"date":1514678400000,"region":8,"human":"2017","y":2017,"m":12},{"category":0,"platform":3,"date":1480982400000,"region":8,"human":"2016-Dec-06","y":2016,"m":12},{"category":0,"platform":14,"date":1480982400000,"region":8,"human":"2016-Dec-06","y":2016,"m":12},{"category":0,"platform":6,"date":1480982400000,"region":8,"human":"2016-Dec-06","y":2016,"m":12},{"category":0,"platform":92,"date":1480982400000,"region":8,"human":"2016-Dec-06","y":2016,"m":12}],"cover":{"cloudinary_id":"kgwsarnz3dkb4gwttc3u"}},
    {"id":17000,"name":"Stardew Valley","url":"https://www.igdb.com/games/stardew-valley","rating":90.7904695586285,"aggregated_rating":90.7142857142857,"release_dates":[{"category":0,"platform":6,"date":1456444800000,"region":8,"human":"2016-Feb-26","y":2016,"m":2},{"category":0,"platform":3,"date":1469750400000,"region":8,"human":"2016-Jul-29","y":2016,"m":7},{"category":0,"platform":14,"date":1469750400000,"region":8,"human":"2016-Jul-29","y":2016,"m":7},{"category":6,"platform":130,"date":1514678400000,"human":"2017-Q4","y":2017,"m":12},{"category":0,"platform":48,"date":1481587200000,"region":2,"human":"2016-Dec-13","y":2016,"m":12},{"category":0,"platform":49,"date":1481673600000,"region":8,"human":"2016-Dec-14","y":2016,"m":12},{"category":0,"platform":48,"date":1481673600000,"region":1,"human":"2016-Dec-14","y":2016,"m":12}],"cover":{"cloudinary_id":"xrpmydnu9rpxvxfjkiu7"}},
    {"id":20874,"name":"Hive Jump","url":"https://www.igdb.com/games/hive-jump","release_dates":[{"category":0,"platform":92,"date":1484697600000,"region":8,"human":"2017-Jan-18","y":2017,"m":1},{"category":0,"platform":3,"date":1484697600000,"region":8,"human":"2017-Jan-18","y":2017,"m":1},{"category":0,"platform":14,"date":1484697600000,"region":8,"human":"2017-Jan-18","y":2017,"m":1},{"category":0,"platform":6,"date":1484697600000,"region":8,"human":"2017-Jan-18","y":2017,"m":1},{"category":0,"platform":92,"date":1484697600000,"region":8,"human":"2017-Jan-18","y":2017,"m":1},{"category":0,"platform":3,"date":1484697600000,"region":8,"human":"2017-Jan-18","y":2017,"m":1},{"category":0,"platform":14,"date":1484697600000,"region":8,"human":"2017-Jan-18","y":2017,"m":1},{"category":0,"platform":6,"date":1484697600000,"region":8,"human":"2017-Jan-18","y":2017,"m":1},{"category":2,"platform":41,"date":1514678400000,"human":"2017","y":2017,"m":12}],"cover":{"cloudinary_id":"pd3msxfmwxiutxx7rzgx"}},
    {"id":6732,"name":"Rise and Shine","url":"https://www.igdb.com/games/rise-and-shine","aggregated_rating":63.5714285714286,"release_dates":[{"category":0,"platform":6,"date":1484265600000,"region":8,"human":"2017-Jan-13","y":2017,"m":1},{"category":0,"platform":49,"date":1484265600000,"region":8,"human":"2017-Jan-13","y":2017,"m":1},{"category":2,"platform":3,"date":1514678400000,"human":"2017","y":2017,"m":12},{"category":2,"platform":14,"date":1514678400000,"human":"2017","y":2017,"m":12},{"category":2,"platform":48,"date":1514678400000,"human":"2017","y":2017,"m":12}],"cover":{"cloudinary_id":"m3pcyvvbezj3fbnxsofm"}},
        { "id": 2072, "name": "Warlock: Master of the Arcane","aggregated_rating": 73.3333333333333, "release_dates": [{"platform": 6}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/pekhye0tuhskjnuhk9o7.png", "cloudinary_id": "pekhye0tuhskjnuhk9o7", "width": 320,"height": 448}},
        {"id": 1121,
    "name": "Watch Dogs",
    "rating": 74.8382510410401,
    "aggregated_rating": 81.0952380952381,
    "release_dates": [
      {
        "platform": 6
      },
      {
        "platform": 9
      },
      {
        "platform": 12
      },
      {
        "platform": 49
      },
      {
        "platform": 48
      },
      {
        "platform": 41
      }
    ], "cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/ztv0vk0azrzbx9ujvriq.png",
      "cloudinary_id": "ztv0vk0azrzbx9ujvriq", "width": 459,"height": 572}},
      
      {
    "id": 529,"name": "Far Cry 3","rating": 86.1293616202,"aggregated_rating": 89.1428571428571,"release_dates": [{"platform": 6},{"platform": 12},{"platform": 9}],"cover": {
      "url": "//images.igdb.com/igdb/image/upload/t_thumb/b7cfpiu41mzj2h2tg5rt.png",
      "cloudinary_id": "b7cfpiu41mzj2h2tg5rt",
      "width": 1064,
      "height": 1331
    }},
    
    {
    "id": 19924,
    "name": "Dark Souls II: Crown of the Sunken King","aggregated_rating": 81.6363636363636,"release_dates":[{"platform": 6 },{"platform": 9},{"platform": 12}],"cover": { "url": "//images.igdb.com/igdb/image/upload/t_thumb/w2xygqzliqihvu2favci.png","cloudinary_id": "w2xygqzliqihvu2favci","width": 1280,"height": 720}}  
    ,{"id": 14675,"name": "Valkyria Chronicles","release_dates": [{"platform": 38},{"platform": 45}],"cover": {     "url": "//images.igdb.com/igdb/image/upload/t_thumb/zawtful22kx7cwhs2qhc.png","cloudinary_id":"zawtful22kx7cwhs2qhc","width": 582,"height": 1000}},
    {"id": 20341,"name": "Dark Souls II: Crown of the Ivory King", "aggregated_rating": 81.7142857142857, "release_dates": [{"platform": 6},{"platform": 9},{"platform": 12}]},
    {"id": 13171,"name": "Read Only Memories","rating": 99.2611637639798,"aggregated_rating": 82,"release_dates": [
      {
        "category": 0,"platform": 72,"date": 1405209600000,"region": 8, "human": "2014-Jul-13", "y": 2014, "m": 7 },{"category": 0, "platform": 6, "date": 1444089600000, "region": 8,"human": "2015-Oct-06","y": 2015,"m": 10},{"category": 0,        "platform": 14, "date": 1444089600000,
        "region": 8,
        "human": "2015-Oct-06",
        "y": 2015,
        "m": 10
      },
      {
        "category": 0,
        "platform": 3,
        "date": 1444089600000,
        "region": 8,
        "human": "2015-Oct-06",
        "y": 2015,
        "m": 10
      },
      {
        "category": 0,
        "platform": 92,
        "date": 1444089600000,
        "region": 8,
        "human": "2015-Oct-06",
        "y": 2015,
        "m": 10
      },
      {
        "category": 0,
        "platform": 48,
        "date": 1484611200000,
        "region": 8,
        "human": "2017-Jan-17",
        "y": 2017,
        "m": 1
      },
      {
        "category": 2,
        "platform": 46,
        "date": 1514678400000,
        "region": 8,
        "human": "2017",
        "y": 2017,
        "m": 12
      }
    ],
    "alternative_names": [
      {
        "name": "2064: Read Only Memories",
        "comment": "Updated rerelease"
      },
      {
        "name": "Read Only Memories: Type-M",
        "comment": "Mobile release"
      }
    ],
    "cover": {
      "url": "//images.igdb.com/igdb/image/upload/t_thumb/vxkifkekdswgaeoa3agm.png",
      "cloudinary_id": "vxkifkekdswgaeoa3agm",
      "width": 682,
      "height": 1080
    }
  }
    ];
    
    var steamList = [
    
    	{
			"appid": 413150,
			"name": "Stardew Valley"
		},
		
	    {
			"appid": 460920,
			"name": "STEEP"
		},
		
		{
			"appid": 203630,
			"name": "Warlock - Master of the Arcane"
		},
		{
			"appid": 298900,
			"name": "Space Hulk Deathwing"
	    },
    	{
    		"appid": 243470,
    		"name": "Watch_Dogs"
    	},
		{
			"appid": 347290,
			"name": "Rise & Shine"
		},
    	{
    		"appid": 220240,
    		"name": "Far Cry® 3"
    	},
		{
			"appid": 271942,
			"name": "Dark Souls\u2122 II Crown of the Sunken King"
		},
		{
			"appid": 294860,
			"name": "Valkyria Chronicles™"
		},
		{
			"appid": 271944,
			"name": " DARK SOULS™ II Crown of the Ivory King "
		},
		{
			"appid": 330820,
			"name": "2064: Read Only Memories"
		}
	];
    
    beforeEach(module('gameJudgement'));
    beforeEach(inject(function($injector){
        
        $httpBackend = $injector.get('$httpBackend');
        
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        var $controller = $injector.get('$controller');
        
        var steamListUrl = 'steamList.json';
        
        requestHandler = { getReleases : function(){
                $httpBackend.expectGET('api.json',{
                'X-Mashape-Key': 'MY_IGDB_API_KEY',
                'Accept' : 'application/json'
                }).respond(function(status, data, headers, statusText) {
                    
                    data = releaseArray;
                    return [200,{data: releaseArray},'OK'];
                });
            },
            getSteamList : function(){
                
                $httpBackend.expectGET(steamListUrl)
                .respond(function(status, data, headers, statusText) {
                    data = steamList;
                    return [200,{data:steamList} ,'OK'];
                });
            }
        };
        $scope.newReleases = {data : releaseArray};
        $scope.steamList = {data: steamList};
        var replaceCounter = 0;
        var gameToTest = " ";
        var cleanedReleaseName = " ";
        
        releaseNameCleaner = function(){
      
          for(var i = 0; i < $scope.steamList.data.length; i++){
              
              if ( gameToTest.toLowerCase() == $scope.steamList.data[i]["name"].toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ( gameToTest.replace(": "," - ").toLowerCase() === $scope.steamList.data[i]["name"].toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ( gameToTest.replace(": "," ").toLowerCase() === $scope.steamList.data[i]["name"].toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ( $scope.steamList.data[i]["name"].replace("_", " ").toLowerCase() === gameToTest.toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ( gameToTest.replace("and","&").toLowerCase() == $scope.steamList.data[i]["name"].toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ( $scope.steamList.data[i]["name"].replace("®","").toLowerCase() == gameToTest.toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ($scope.steamList.data[i]["name"].replace("\u2122","").toLowerCase() == gameToTest.toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ($scope.steamList.data[i]["name"].replace("\u2122","").toLowerCase() == gameToTest.replace(": ", " ").toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ($scope.steamList.data[i]["name"].replace("\u2122","").trim().toLocaleLowerCase() == gameToTest.replace(": ", " ").toLowerCase()){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
              
              else if ( gameToTest.toUpperCase() == $scope.steamList.data[i]["name"]){
                replaceCounter++;
                gameToTest = $scope.steamList.data[i]["name"];
              }
            }
        }
        
        spyOn(requestHandler,'getReleases');
        spyOn(requestHandler,'getSteamList');
        
        requestHandler.getReleases();
        requestHandler.getSteamList();
        
        createController = function(){
            return $controller('recentReleasesCtrl',{'$scope' : $scope});
        };
        var timeInMs = Date.now();
        
    }));
    
    it("Should be true if the request for recent releases was sent", function(){
        
        expect(requestHandler.getReleases).toHaveBeenCalled();
    });
    
    it("Should be true if the request for the list of steam games was fulfilled", function() {
        
        expect(requestHandler.getSteamList).toHaveBeenCalled();
    });
    
    it("Should be true if the press rating and the players' rating don't exist",function() {
       
       expect(!$scope.newReleases.data[8].aggregated_rating && !$scope.newReleases.data[8].rating).toBe(true); 
    });
    
    it("Should be true if the press score exists", function() {
        $httpBackend.expectGET(igdb_releases,{
        'X-Mashape-Key': 'MY_IGDB_API_KEY',
        'Accept' : 'application/json'
        }).respond(function(status, data, headers, statusText) {
 
            return [200,{data: releaseArray},'OK'];
        });
        
        expect(!$scope.newReleases.data[1].aggregated_rating).toBe(false);
    });
    
    
    it("Should be true if the press rating >= 75", inject(function($http){

        
        expect($scope.newReleases.data[1].aggregated_rating >= 75).toBe(true);
    }));
    
    it("Should be true if the press rating does not exist and the player rating >= 75", function() {
       
        expect(!$scope.newReleases.data[0].aggregated_rating && $scope.newReleases.data[0].rating >= 75).toBe(true); 
    });
    
    it("Should be true if the press rating is < 75", function() {
       
       expect($scope.newReleases.data[2].aggregated_rating < 75).toBe(true); 
    });
    
    
    it("Should be true if the image ID exists", function() {
        
        expect(!$scope.newReleases.data[1].cover.cloudinary_id).toBe(false);
    });
    
    it("Should be true if a game is on PC but not on the steam store", function() {
        
        var gameName = $scope.newReleases.data[0].name;
        var gamePlatform = 6;
        var steamName;
        
        for (var j = 0; j < $scope.steamList.data.length; j++){
            if($scope.steamList.data[j].name == gameName) {
                
                var steamName = $scope.steamList.data[i].name;
            }
        }
        
        expect((gamePlatform == 6) && (steamName !== gameName)).toBe(true);
    });
    
    /*
    The following tests are for comparing names from IGDB with game names on the steam store
    */
    
    it("Should replace colon trailing space with dash and spaces", function() {
        
        gameToTest = $scope.newReleases.data[10].name;
        releaseNameCleaner();
        cleanedReleaseName = gameToTest;
        expect(gameToTest).toBe(cleanedReleaseName);
        
    });
    
    it("Should replace colon trailing space with a single space character", function() {
        gameToTest = $scope.newReleases.data[2].name;
        releaseNameCleaner();
        cleanedReleaseName = gameToTest;
        expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should upeprcase a string", function() {
       
       gameToTest = $scope.newReleases.data[0].name;
       releaseNameCleaner();
       cleanedReleaseName = gameToTest;
       expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should replace underscore with nothing", function() {
       
       gameToTest = $scope.newReleases.data[11].name;
       releaseNameCleaner();
       cleanedReleaseName = gameToTest;
       expect(gameToTest).toBe(cleanedReleaseName); 
    });
    
    it("Should replace ampersand (&) with and", function() {
       
       gameToTest = $scope.newReleases.data[9].name;
       releaseNameCleaner();
       cleanedReleaseName = gameToTest;
       expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should replace registered symbol with nothing", function() {
        
       gameToTest = $scope.newReleases.data[12].name;
       releaseNameCleaner();
       cleanedReleaseName = gameToTest;
       expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should replace trademark symbol with nothing", function() {
       
       gameToTest = $scope.newReleases.data[14].name;
       releaseNameCleaner();
       cleanedReleaseName = gameToTest;
       expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should replace trademark symbol and colon trailing space with nothing", function() {
       
       gameToTest = $scope.newReleases.data[13].name;
       releaseNameCleaner();
       cleanedReleaseName = gameToTest;
       expect(gameToTest).toBe(cleanedReleaseName); 
    });
    
    it("Should replace trademark symbol and colon trailing space with nothing and strip white space", function() {
        
       gameToTest = $scope.newReleases.data[15].name;
       releaseNameCleaner();
       cleanedReleaseName = gameToTest;
       expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should be true if a game is on PC but not yet released", function() {
       
       expect(timeInMs < $scope.newReleases.data[0].release_dates[2].date).toBe(true);
           
    });
    
    it("Should be true if a game's alternative name matches a game on the steam store",function() {
       
       gameToTest = $scope.newReleases.data[16].alternative_names[0].name;
       
       expect(gameToTest == steamList[10].name).toBe(true);
       
    });
});