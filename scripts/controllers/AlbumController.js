// ALBUM CONTROLLER ======================================================
myAppModule.controller('AlbumController', ['$scope', 'SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {
    
    $scope.totalTime = '-:--';
    $scope.currentTime = '-:--';
    $scope.album = SongPlayer.currentAlbum;
    $scope.player = SongPlayer;
    $scope.selectedRow = null; 
    
    //Show play button when hover over song number 
    $scope.mouseOver = function($event, songNumber) {
        
        if (songNumber !== SongPlayer.currentlyPlayingSongNumber){
            var td = $event.target;
            $(td).find('div').hide();
            $(td).find('a').show();
            $(td).find('.ion-play').show();
            $(td).find('.ion-pause').hide();
        }
    };
    
    //Show song number when mouse leaves hover
    $scope.mouseLeave = function($event, songNumber) {
        
        if (songNumber !== SongPlayer.currentlyPlayingSongNumber){
            var td = $event.target;
            $(td).find('div').show();
            $(td).find('a').hide();
        }
        
    };
    
    
//When play button is clicked on song row play song and change button to pause
    $scope.play = function($event, songNumber) {

        
        if (SongPlayer.currentlyPlayingSongNumber !== null && SongPlayer.currentlyPlayingSongNumber !== songNumber){
            // Show the song number in the row 
            var songCell = angular.element(document.querySelector('.selected'));
            console.log(songCell);
//            var td = $event.target;
            $(songCell).find('div').show();
            $(songCell).find('a').hide();
        
        
        }
        
        if (SongPlayer.currentlyPlayingSongNumber !== songNumber) {
        
            //Show pause button when play button is clicked 
            var td = $event.target;
            $(td).hide();
            $(td).next().show();
            
            //Change this song row to the current selected song row 
            $scope.selectedRow = songNumber;

            //Send song number playerbar
            $scope.$broadcast('playSong', 
                              { songNumber: songNumber });

            //Set song info in metrics
            var songObj = SongPlayer.currentAlbum.songs[songNumber];
            Metric.registerSongPlay(songObj);
            
        
        }else if (SongPlayer.currentlyPlayingSongNumber === songNumber) {
            
            if (SongPlayer.currentSoundFile.isPaused()) {
                var td = $event.target;
                $(td).hide();
                $(td).next().show();
                
                SongPlayer.currentSoundFile.play();
                
                //Send song number playerbar
                $scope.$broadcast('playSong', 
                              { songNumber: songNumber });
                
            } else {
                var td = $event.target;
                $(td).hide();
                $(td).prev().show();
                SongPlayer.currentSoundFile.pause();  
                
                $scope.$broadcast('pauseSong',
                                  {});
            }
    
        }
        
    };


}]);