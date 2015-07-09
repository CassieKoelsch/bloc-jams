// ALBUM CONTROLLER ======================================================
myAppModule.controller('AlbumController', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    
    $scope.totalTime = '-:--';
    $scope.currentTime = '-:--';
    $scope.album = SongPlayer.currentAlbum;
    $scope.player = SongPlayer;
       
    $scope.mouseOver = function($event) {
        var td = $event.target;
        $(td).find('div').hide();
        $(td).find('a').show();
        $(td).find('.ion-play').show();
        $(td).find('.ion-pause').hide();
    };
    
    $scope.mouseLeave = function($event) {
        var td = $event.target;
        $(td).find('div').show();
        $(td).find('a').hide();
        
    };
    
     $scope.play = function(songNumber) {
         
         SongPlayer.setSong(songNumber);
         
 

//         $scope.$broadcast('myCustomEvent', {
//        someProp: 'Sending you an Object!' // send whatever you want
//         });
   
     };
    


}]);