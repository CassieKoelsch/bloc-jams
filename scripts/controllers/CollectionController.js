// COLLECTION CONTROLLER ================================================
myAppModule.controller('CollectionController', ['$scope', 'SongPlayer', function($scope, SongPlayer) {

    $scope.albums = [albumPicasso, albumKent, albumMarconi];

}]);

