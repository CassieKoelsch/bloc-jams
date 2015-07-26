// COLLECTION CONTROLLER ================================================
myAppModule.controller('CollectionController', ['$scope', 'SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {

    $scope.albums = [albumPicasso, albumKent, albumMarconi];

}]);

