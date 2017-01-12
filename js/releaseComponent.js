function recentReleasesController(){
    
}

angular.module('gameApp').component('releaseDetail',{
    templateUrl: 'recentReleases.html',
    controller: recentReleasesController,
    bindings:{
        release: '='
    }
});

