// PLAYER_BAR CONTROLLER ======================================================
myAppModule.controller('PlayerBarController', ['$scope', 'SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {
   
    $scope.volume = SongPlayer.volume / 100;
    $scope.progress = SongPlayer.getProgress();
    $scope.totalTime = '--:--';
    $scope.currentTime = '--:--';
    $scope.player = SongPlayer;
    
    //Get song number when play is clicked on ablum song row
    $scope.$on('playSong', function (event, args) {
        
        $scope.playing = true;
        SongPlayer.setSong(args.songNumber);
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function(){
                $scope.totalTime = self.getDuration();
             });
         });
        
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
                });
         });
        

    });
    
    //Change to pause icon when paused on song row
    $scope.$on('pauseSong', function (event, args) {
        $scope.playing = false;
    
    
    });
    
    
    $scope.$watch('progress', function(newValue, oldValue, scope) {
        var file = SongPlayer.currentSoundFile;
        if (file === null) return;
        var newPercent = newValue * 100;
        if(Math.abs(file.getPercent() - newPercent) > 1) file.setPercent(newPercent);
    });

    SongPlayer.addListener('timeupdate', function (event) {
        $scope.$apply(function () {
        $scope.progress = SongPlayer.getProgress();
        });
    });
    
    $scope.$watch('volume', function(newValue, oldValue, scope) {
        SongPlayer.setVolume(newValue * 100);
    });
      
    $scope.previousSong = function() {
        SongPlayer.previous(); 
        $scope.playing = true; 
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function(){
                $scope.totalTime = self.getDuration();
             });
         });
        
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
                });
         });
        $scope.$emit('previousNextFromPlayerBar',{});
    };
    
    $scope.nextSong = function() {
        SongPlayer.next();
        $scope.playing = true; 
        
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
             $scope.$apply(function(){
                 $scope.totalTime = self.getDuration();
             });
        });
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
                });
         });
        $scope.$emit('previousNextFromPlayerBar',{});
    };
    
    
    $scope.play = function(songNumber) {
        if(songNumber >= 0) {
            SongPlayer.setSong(songNumber);
            SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
                var self = this;
            $scope.$apply(function(){
                $scope.totalTime = self.getDuration();
             });
        });
            
         SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
            });
         }); 
        } else {
           SongPlayer.play();
        }
        $scope.playing = true; 
        $scope.$emit('playPauseFromPlayerBar',{});
        
                                         
    };
                                           
    $scope.pauseSong = function() {
        SongPlayer.pause();
        $scope.playing = false;
        $scope.$emit('playPauseFromPlayerBar',{});

    }; 
   
    


}]);
