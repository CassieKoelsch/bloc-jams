// ALBUM CONTROLLER ======================================================
myAppModule.controller('AlbumController', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    
//    $scope.totalTime = '-:--';
//    $scope.currentTime = '-:--';
    $scope.album = SongPlayer.currentAlbum;
    $scope.player = SongPlayer;
    
    //Show play button when hover over song number 
    $scope.mouseOver = function($event) {
        var td = $event.target;
        $(td).find('div').hide();
        $(td).find('a').show();
        $(td).find('.ion-play').show();
        $(td).find('.ion-pause').hide();
    };
    
    //Show song number when mouse leaves hover
    $scope.mouseLeave = function($event) {
        var td = $event.target;
        $(td).find('div').show();
        $(td).find('a').hide();
        
    };
    
    
    //Play the song when clicked and change play to pause button on song row and player bar
     $scope.play = function(songNumber) {

         
         SongPlayer.setSong(songNumber);
         SongPlayer.playing = true;

         
 

//         $scope.$broadcast('myCustomEvent', {
//         SongPlayer.setSong(songNumber);
//     
//
//         });
   
     };
    


}]);