// METRICS SERVICE ======================================================
myAppModule.service('Metric', ['$rootScope', function($rootScope) {
    $rootScope.songPlays = [];

    return {
        // Function that records a metric object by pushing it to the $rootScope array
        registerSongPlay: function(songObj) {
            // Add time to event register
            songObj['playedAt'] = new Date();
            $rootScope.songPlays.push(songObj);
            
        },
        listSongsPlayed: function() {
            var songs = [];
            angular.forEach($rootScope.songPlays, function(song) {
                songs.push(song.name);
            });
            return songs;
        }
    };
}]);