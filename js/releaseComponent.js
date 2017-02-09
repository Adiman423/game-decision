function recentReleasesCtrl(){
  
}

angular.module('gameJudgement').component('releases',{
  
  templateUrl: '/releases.html',
  controller: recentReleasesCtrl,
  bindings:{
      release : '<',
      steamList : '<',
      target : '<',
      steam : '<',
      rightNow : '<',
      threeMonthsAgo : '<'
  }
});
