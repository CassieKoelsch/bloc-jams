myAppModule.controller('MetricsController', ['$scope', 'SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {

    $scope.songs = Metric.listSongsPlayed();
    
    

}]);