// LANDING CONTROLLER ===================================================
myAppModule.controller('LandingController', ['$scope', function ($scope) {
    $scope.heroTitle = 'Turn the music up!';
    
    $scope.albumImages = {
    imageUrl: ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png', '09.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', '21.png']
    };
    
    
    //Shuffle images when clicked 
    $scope.shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

}]);
