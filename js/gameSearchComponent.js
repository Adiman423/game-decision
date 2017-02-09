function gameSearchCtrl(){
    
}

angular.module('gameJudgement').component('searchResults',{
    templateUrl: 'search_results.html',
    controller: gameSearchCtrl,
    bindings: {
        game: '<',
        target: '<',
        steamList: '<',
        games: '<',
        rightNow: '<'
    }
    
});
