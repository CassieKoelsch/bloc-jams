// ALBUM CONTROLLER ======================================================
myAppModule.controller('AlbumController', ['$scope', 'SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {
    
    $scope.totalTime = '-:--';
    $scope.currentTime = '-:--';
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
    
    
//When play button is clicked on song row play song and change button to pause
    $scope.play = function($event, songNumber) {

        //Show pause button when play button is clicked 
        var td = $event.target;
        $(td).hide();
        $(td).next().show();
        
         
        
        //Send song number playerbar
        $scope.$broadcast('playSong', 
                          { songNumber: songNumber });
        
        //Set song info in metrics
        var songObj = SongPlayer.currentAlbum.songs[songNumber];
        Metric.registerSongPlay(songObj);
        
    
        
    };
    


}]);