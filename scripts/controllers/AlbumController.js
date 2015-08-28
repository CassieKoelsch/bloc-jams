// ALBUM CONTROLLER ======================================================
myAppModule.controller('AlbumController', ['$scope', '$interval', 'SongPlayer', 'Metric', function($scope, $interval, SongPlayer, Metric) {
    
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
//            var songObj = SongPlayer.currentAlbum.songs[songNumber];
//            Metric.registerSongPlay(songObj);
            
        
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
    
    $scope.$on('playPauseFromPlayerBar', function (event, args) {
        if (!SongPlayer.currentSoundFile.isPaused()){
        
            var songCell = angular.element(document.querySelector('.selected'));
            $(songCell).find('div').hide();
            $(songCell).find('a').show();
            $(songCell).find('.ion-play').hide();
            $(songCell).find('.ion-pause').show();  
            
        }else{
            
            var songCell = angular.element(document.querySelector('.selected'));
            $(songCell).find('div').hide();
            $(songCell).find('a').show();
            $(songCell).find('.ion-play').show();
            $(songCell).find('.ion-pause').hide();
        
        }
    });
    
    $scope.$on('previousNextFromPlayerBar', function (event, args) {
       
        //Change all other rows to show song number 
        var songCell = angular.element(document.querySelector('.selected'));

        $(songCell).find('div').show();
        $(songCell).find('a').hide();
        
        
        var songNumber = SongPlayer.currentlyPlayingSongNumber
        //Change selected class to new song 
        $scope.selectedRow = songNumber;
//        console.log($scope.selectedRow);
        songCell = angular.element(document.querySelector('.selected'));


        //Change new song icon to pause
        
        console.log(songCell);
        $(songCell).find('div').hide();
        $(songCell).find('a').show();
        $(songCell).find('.ion-play').hide();
        $(songCell).find('.ion-pause').show(); 
        
        
    
    });
    
    //Update playerbar while song plays
        var playOrPause;
        var runTime = function() {
            playOrPause = $interval( function(){
              if (SongPlayer.isPlaying){
                $scope.currentTime = SongPlayer.currentSoundFile.getTime();
                var seekBarFillRatio = SongPlayer.currentSoundFile.getTime() /          SongPlayer.currentSoundFile.getDuration();
                var seekBar = document.querySelector('.seek-control .seek-bar');
                SongPlayer.updateSeekPercentage(seekBar, seekBarFillRatio);        
              } else if (!SongPlayer.isPlaying) {
                $scope.stopTime();
              }
            }, 100);
          };


          $scope.stopTime = function(scope) {
            $interval.cancel(playOrPause);
          };


          $scope.$watch(function(){
            return SongPlayer.isPlaying; 
          }, function(){
            runTime(); 
          });


          $scope.$watch(function(){
            if(SongPlayer.currentSoundFile){
              return SongPlayer.currentSoundFile.isEnded();
            } 
          }, function(){ 
            if (SongPlayer.currentSoundFile){
              if (SongPlayer.currentSoundFile.isEnded()){
                SongPlayer.isPlaying = false;
              }
            } 
          });


}]);