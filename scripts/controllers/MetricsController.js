myAppModule.controller('MetricsController', ['$scope', 'SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {

    $scope.songs = Metric.listSongsPlayed();
    
    
    $scope.options = {
      data: [
          {
            blue: 5,
            green: 8,
            red: 4,
            pink: 8,
            magenta: 3
          }
      
      ],
      dimensions: {
        blue: {
            type: 'bar',
            color: 'blue',
        },
        green: {
            type: 'bar',
            color: 'green'
        },
        red: {
            type: 'bar',
            color: 'red'
        },
        pink: {
            type: 'bar',
            color: 'pink'
        },
        magenta: {
            type: 'bar',
            color: 'magenta'
        }
      }
    };
    
}]);