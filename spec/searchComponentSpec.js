describe('gameSearchCtrl', function(){
  
    var resultArray,$controller,$httpBackend,$rootScope,requestHandler,createController,steamArray, $scope, searchctrl;
    beforeEach(angular.mock.module('gameJudgement'));
    beforeEach(inject(function($injector){
      
      resultArray = [
      {"id": 9509, "name": "Call of Duty: Black Ops III","rating": 71.3410650247185,"aggregated_rating": 76.7777777777778,"release_dates": [{"platform": 48},{       "platform": 49},{"platform": 6}], "cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/sllwko8hqltmmklognzp.png","cloudinary_id": "sllwko8hqltmmklognzp","width": 1008,"height": 1161}}, {"id": 949,"name": "Call of Duty 3","rating": 68.5523819976335,"aggregated_rating": 71, "release_dates": [{ "platform": 12},{"platform": 11}, {"platform": 8},{"platform": 9},{"platform": 5}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/o94ra29yic3b1sfnwhei.png","cloudinary_id": "o94ra29yic3b1sfnwhei","width": 600,"height": 771 } },
      {"id": 979, "name": "Call of Duty: Modern Warfare 3", "rating": 68.3259509436741,"aggregated_rating": 89.4,"release_dates": [{"platform": 6},{"platform": 12}, {"platform": 9},{"platform": 5}],"cover": { "url": "//images.igdb.com/igdb/image/upload/t_thumb/obimr8uf45m5cdjltket.png","cloudinary_id": "obimr8uf45m5cdjltket","width": 763,"height": 1078}},
      {"id":559,"name":"Call of Duty:Modern Warfare 2", "rating": 77.5442100472389,"aggregated_rating": 94.2857142857143,"release_dates": [{"platform": 6},{"platform": 12},{"platform": 9}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/ky6nhzxx6aoje50cryzs.png", "cloudinary_id": "ky6nhzxx6aoje50cryzs", "width": 600, "height": 862}},
      {"id": 622,"name": "Call of Duty 2","rating": 86.7867796358458, "aggregated_rating": 84.4, "release_dates": [{"platform": 6},{"platform": 12},{"platform": 14}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/y7t9xbdtg6uvbvazdxl4.png","cloudinary_id": "y7t9xbdtg6uvbvazdxl4","width": 600,"height": 734}},
      {"id": 24920,"name": "Call of Duty: Modern Warfare Remastered", "rating": 81.0455918286415, "aggregated_rating": 86.8888888888889,"release_dates": [{"platform": 6},{"platform": 48},{"platform": 49}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/yixntz4bbcnw8qfnea7v.png","cloudinary_id": "yixntz4bbcnw8qfnea7v","width": 1200,"height": 1548}},
      {"id": 18968,"name": "Call of Duty: Infinite Warfare", "rating": 74.0778177057184,"aggregated_rating": 78.125,"release_dates": [{"platform": 48},{"platform": 49},{"platform": 6}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/eal3ny34yjjyirfio9wj.png","cloudinary_id": "eal3ny34yjjyirfio9wj","width": 3238,"height": 4000}},{"id": 623,"name": "Call of Duty 4: Modern Warfare","rating": 84.2272905628162,"aggregated_rating": 86.6666666666667, "release_dates": [{"platform": 6},      {"platform": 9},{"platform": 12},{"platform": 20},{"platform": 5},{"platform": 14}],"cover": {
          "url": "//images.igdb.com/igdb/image/upload/t_thumb/okxplofk1uomxyrnlf2u.png","cloudinary_id": "okxplofk1uomxyrnlf2u","width": 1062,"height": 1500}},
      {"id": 621, "name": "Call of Duty","rating": 85.3205232431592, "aggregated_rating": 86.6666666666667,"release_dates": [{            "platform": 6},{"platform": 42}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/hd5iiegkb4gdz69rwnde.png","cloudinary_id": "hd5iiegkb4gdz69rwnde","width": 640,"height": 908}},
      {"id": 2033,"name": "Call of Duty: Ghosts","rating": 67.4520987455782,"aggregated_rating": 73.6086956521739,"release_dates": [{"platform": 48},{"platform": 49},{"platform": 9},{"platform": 12},{"platform": 6},{"platform": 41}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/dosn3feq6osjryjy2wxj.png","cloudinary_id":"dosn3feq6osjryjy2wxj","width": 283,"height": 352}},{"id": 1341,"name": "Beyond Good and Evil","rating": 87.4559191161718,"aggregated_rating": 90.6, "release_dates": [{"category": 0,"platform": 8,"date": 1068508800000,"region": 2,"y": 2003,"m": 11},{"category": 0,"platform": 8,"date": 1068768000000,"region": 1, "y": 2003,"m": 11},{"category": 0,"platform": 6,"date": 1069200000000,"region": 2 ,"y": 2003,"m": 11},{"category": 0,"platform": 6,"date": 1070582400000,"region": 1,"y": 2003,"m": 12},{"platform": 11,"date": 1070323200000,"region": 2,"y": 2003,"m": 12},{"platform": 11,"date": 1077840000000,"region": 1,"y": 2004,"m": 2},{"category": 0,"platform": 21,"date": 1071100800000,"region": 2,"y": 2003,"m": 12},{ "category": 0,"platform": 21,"date": 1077840000000,"region": 1,"y": 2004,"m": 2},{"category": 2,"platform": 21,"date": 1072828800000,"region": 3,"y": 2003,"m": 12},{"category": 0,"platform": 6,"date": 1210636800000,"region": 8, "y": 2008,"m": 5},{"category": 0,"platform": 36,"date": 1299024000000,        "region": 8,"y": 2011,"m": 3},{"category": 0,"platform": 45,"date": 1307491200000,"region": 1,"y": 2011,"m": 6},{      "category": 0,"platform": 45,"date": 1309219200000,"region": 2,"y": 2011,"m": 6}],"cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/bd66fajpaeiivz7tiobq.png","cloudinary_id": "bd66fajpaeiivz7tiobq","width": 1200,"height": 1468}},
      { "id": 20341,"name": "Dark Souls II: Crown of the Ivory King","aggregated_rating": 81.7142857142857,"release_dates": [{        "category": 0,"platform": 6,"date": 1411516800000,"y": 2014,"m": 9},{"category": 0,"platform": 9,"date": 1411516800000,        "y": 2014,"m": 9},{"category": 0,"platform": 12, "date": 1411516800000,"y": 2014,"m": 9}]},
  {"id": 7498,"name": "Tekken 7","release_dates": [{ "category": 0, "platform": 6,"date": 1496361600000,"region": 8,"y": 2017,"m": 6  },{"category": 0,"platform": 49,"date": 1496361600000, "region": 8,"y": 2017,"m": 6},{"category": 0,"platform": 48,"date":1496361600000, "region": 8,"y": 2017,"m": 6},{"category": 0,"platform": 52,"date": 1426636800000,"region": 5,"y": 2015,"m": 3}], "cover": {"url": "//images.igdb.com/igdb/image/upload/t_thumb/msgyrbeuh3bfdbc8avfz.png","cloudinary_id":"msgyrbeuh3bfdbc8avfz","width": 650,"height": 926}},
    {"id":13171,"name":"Read Only Memories","url":"https://www.igdb.com/games/read-only-memories","rating":99.2611637639798,"aggregated_rating":81.6666666666667,"release_dates":[{"category":0,"platform":72,"date":1405209600000,"region":8,"human":"2014-Jul-13","y":2014,"m":7},{"category":0,"platform":6,"date":1444089600000,"region":8,"human":"2015-Oct-06","y":2015,"m":10},{"category":0,"platform":14,"date":1444089600000,"region":8,"human":"2015-Oct-06","y":2015,"m":10},{"category":0,"platform":3,"date":1444089600000,"region":8,"human":"2015-Oct-06","y":2015,"m":10},{"category":0,"platform":92,"date":1444089600000,"region":8,"human":"2015-Oct-06","y":2015,"m":10},{"category":0,"platform":48,"date":1484611200000,"region":8,"human":"2017-Jan-17","y":2017,"m":1},{"category":2,"platform":46,"date":1514678400000,"region":8,"human":"2017","y":2017,"m":12}],"alternative_names":[{"name":"2064: Read Only Memories","comment":"Updated rerelease"},{"name":"Read Only Memories: Type-M","comment":"Mobile release"}],"cover":{"cloudinary_id":"vxkifkekdswgaeoa3agm"}}];
    
    steamArray = [
      {	"appid": 42680,"name": "Call of Duty Modern Warfare 3"},
			{"appid": 209160,"name": "Call of Duty - Ghosts"},
			{"appid": 311210,"name": "CALL OF DUTY: BLACK OPS III"},
			{"appid": 2620,"name": "Call_of_Duty"},
			{"appid": 15130,"name": "Beyond Good & Evil"},{"appid": 7940,"name": "Call of Duty 4®: Modern Warfare"},
			{"appid": 10180,"name": "Call of Duty\u2122: Modern Warfare 2"},
			{"appid": 292730,"name": "Call of Duty\u2122 Infinite Warfare"},
			{"appid": 2630,"name": "Call of Duty 2"},
			{"appid": 271944,"name": " Dark Souls\u2122 II Crown of the Ivory King "},
			{"appid": 330820,"name": "2064: Read Only Memories"}
      ];
      
      
      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $httpBackend = $injector.get('$httpBackend');
      
      requestHandler = { "getSearchResults": function(){
        $httpBackend.expectGET(igdb_api,{
          'X-Mashape-Key' : 'MY_IGDB_API_KEY',
          'Accept' : 'application/json'
        }).respond(function(status,data,headers,statusText){
          
          data = resultArray;
          return [200,{data:resultArray},'OK'];
        });
        
        },
        getSteamList : function(){
            $httpBackend.expectGET(steamListUrl)
            .respond(function(status,data,headers,statusText){
                data = steamArray;
                return [200, {data: steamArray}, 'OK'];
            });
          }
        
      };
        
      createController = function(){
        return $controller('gameSearchCtrl', { $scope: $scope });
      };  
      spyOn(requestHandler,'getSearchResults');
      spyOn(requestHandler,'getSteamList');
      
      searchctrl = createController();
      searchctrl.steamList = steamArray;
      searchctrl.games = resultArray;

      
      requestHandler.getSearchResults();
      requestHandler.getSteamList();
    }));
    
    it("Should be true if the request for search results sent by the user was sent", function() {
       
      expect(requestHandler.getSearchResults).toHaveBeenCalled();
    });
    
    it("Should be true if the request for the list of steam games was fulfilled", function() {
       
      expect(requestHandler.getSteamList).toHaveBeenCalled(); 
    });
    
    it("Should be true if the press rating exists", function() {
       
      expect(!searchctrl.games[0].aggregated_rating).toBe(false);
    });
    
    it("should be true if the press rating >= 75", function(){
      
      expect(searchctrl.games[0].aggregated_rating >= 75).toBe(true);
    });

    it("Should be true if the press rating does not exist and the players' rating >= 75",function() {
      
      var aggregated_rating = null;
      var rating = 75.451;
      expect((aggregated_rating === null) && (rating >= 75)).toBe(true);
    });
    
    it("Should be true if the press rating does not exist and the players' rating is < 75", function() {
      
      var rating = 71.3410650247185;
      var aggregated_rating = null;
      
      expect(!aggregated_rating && rating < 75).toBe(true)
    });
    
    it("Should be true if the press rating and the players' rating do not exist", function() {
      
      var aggregated_rating = null;
      var rating = null;
      expect(!aggregated_rating && !rating).toBe(true);
    });
    
    it("Should be true if the cover/box art exists for a game", function() {
       
      expect(searchctrl.games[0].cover.cloudinary_id !== null).toBe(true);
    });

    it("Should replace colon trailing space with nothing", function(){
      gameToTest = searchctrl.games[2].name;
      searchctrl.gameNameCleaner();
      cleanedGameName = gameToTest;
      expect(cleanedGameName).toBe(gameToTest);
    });
    
    it("Should replace colon trailing space with dash and spaces", function(){
        gameToTest = searchctrl.games[9].name;
        searchctrl.gameNameCleaner();
        cleanedGameName = gameToTest;
        expect(gameToTest).toBe(cleanedGameName);
    });
    
    it("Should uppercase a string", function() {
        gameToTest = searchctrl.games[0].name;
        searchctrl.gameNameCleaner();
        cleanedGameName = gameToTest;
        expect(gameToTest).toBe(cleanedGameName); 
    });

    it("Should replace underscore with nothing", function() {
        gameToTest = searchctrl.games[8].name;
        searchctrl.gameNameCleaner();
        cleanedGameName = gameToTest;
        expect(gameToTest).toBe(cleanedGameName); 
    });
    
    it("Should replace underscore with nothing", function() {
        gameToTest = searchctrl.games[8].name;
        searchctrl.gameNameCleaner();
        cleanedGameName = gameToTest;
        expect(gameToTest).toBe(cleanedGameName); 
    });
    
    it("Should replace and with ampersand(&)", function() {
        gameToTest = searchctrl.games[10].name;
        searchctrl.gameNameCleaner();
        cleanedGameName = gameToTest;
        expect(gameToTest).toBe(cleanedGameName); 
    });
    
    it("Should replace registered symbol with nothing", function() {
        
      gameToTest = searchctrl.games[7].name;
      searchctrl.gameNameCleaner();
      cleanedReleaseName = gameToTest;
      expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should replace trademark symbol with nothing", function() {
       
      gameToTest = searchctrl.games[3].name;
      searchctrl.gameNameCleaner();
      cleanedReleaseName = gameToTest;
      expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should replace trademark symbol and colon trailing space with nothing", function() {
       
      gameToTest = searchctrl.games[6].name;
      searchctrl.gameNameCleaner();
      cleanedReleaseName = gameToTest;
      expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should replace trademark symbol and colon trailing space with nothing", function() {
       
      gameToTest = searchctrl.games[6].name;
      searchctrl.gameNameCleaner();
      cleanedReleaseName = gameToTest;
      expect(gameToTest).toBe(cleanedReleaseName);
    });
    
    it("Should be true if a game is on PC but not yet released", function() {
       
      expect((timeInMs < searchctrl.games[12].release_dates[0].date) && searchctrl.games[12].release_dates[0].platform == 6).toBe(true);
    });
    it("Should be true if a game's alternative name matches a steam Name", function(){
      
      expect(searchctrl.altNameChecker() >= 1).toBe(true);
    });
    
});