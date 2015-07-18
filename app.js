var myAppModule = angular.module('myApp', ['ui.router']);

myAppModule.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
    
    $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });
    
    $stateProvider
        
        // HOME STATE ============================================
        .state('home', {
            url: '/',
            controller: 'LandingController',
            templateUrl: 'views/landing.html'
        })
        
        // COLLECTION STATE =======================================
        .state('collection', {
            url: '/collection',
            controller: 'CollectionController',
            templateUrl: 'views/collection.html'     
        })
    
        // ALBUM STATE =============================================
        .state('album', {
            url: '/album',
            controller: 'AlbumController', 
            templateUrl: 'views/album.html'     
        });
        
    
     $urlRouterProvider.otherwise('/');
}]);








// ALBUM DATA ==========================================================
// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: '/assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '2:41', audioUrl: '/assets/music/blue' },
        { name: 'Green', length: '1:43', audioUrl: '/assets/music/green' },
        { name: 'Red', length: '4:28', audioUrl: '/assets/music/red' },
        { name: 'Pink', length: '2:33', audioUrl: '/assets/music/pink' },
        { name: 'Magenta', length: '6:14', audioUrl: '/assets/music/magenta' } 
    ]
};

// Another Example Album
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15'}
    ]
};

// Last Example Album
var albumKent = {
    name: 'Raconte-Moi...',
    artist: 'Stacey Kent',
    label: 'Jazz',
    year: '2010',
    albumArtUrl: 'assets/images/album_covers/15.png',
    songs: [
        { name: 'Les eaux de Mar', length: '3:38' },
        { name: 'Jardin d\'hiver', length: '3:34' },
        { name: 'Raconte-moi...', length: '3:43'},
        { name: 'La Venus du melo', length: '3:47' },
        { name: 'Au coin du monde', length: '4:14'}
    ]
};


// TIME FILTER ==========================================================

myAppModule.filter('filterTime', function(){

    return function(timeInSeconds){
        
        var time = parseFloat(timeInSeconds);
    
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time - minutes * 60);
    
        if (seconds < 10) {seconds = "0"+seconds;}
        var time = minutes + ':' + seconds;
        
        if (isNaN(seconds)){
            return '--:--';
        }else{
        return time;
        }
    };
});











