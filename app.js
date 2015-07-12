var myAppModule = angular.module('myApp', ['ui.router']);

myAppModule.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
    
    $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });
    
    $stateProvider
        
        // HOME STATES ============================================
        .state('home', {
            url: '/',
            controller: 'LandingController',
            templateUrl: 'views/landing.html'
        })
        
        // COLLECTION STATES =======================================
        .state('collection', {
            url: '/collection',
            controller: 'CollectionController',
            templateUrl: 'views/collection.html'     
        })
    
        // ALBUM STATES =============================================
        .state('album', {
            url: '/album',
            controller: 'AlbumController', 
            templateUrl: 'views/album.html'     
        });
        
    
     $urlRouterProvider.otherwise('/');
}]);



// LANDING CONTROLLER ===================================================
myAppModule.controller('LandingController', ['$scope', function ($scope) {
    $scope.heroTitle = 'Turn the music up!';
    
    $scope.albumImages = {
    imageUrl: ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png', '09.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', '21.png']
    };
    
    //Shuffle album covers when clicked
    $scope.shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

}]);



// COLLECTION CONTROLLER ================================================
myAppModule.controller('CollectionController', ['$scope', function($scope) {

    $scope.albums = [albumPicasso, albumKent, albumMarconi];

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



// ALBUM CONTROLLER ======================================================
myAppModule.controller('AlbumController', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    
    $scope.player = SongPlayer;
    
    //Show play button when mouse is over song number 
    $scope.mouseOver = function($event) {
        var td = $event.target;
        $(td).find('div').hide();
        $(td).find('a').show();
        $(td).find('.ion-play').show();
        $(td).find('.ion-pause').hide();
        
    };
    
    //Show song number when mouse leaves play button 
    $scope.mouseLeave = function($event) {
    
            var td = $event.target;
            $(td).find('div').show();
            $(td).find('a').hide();
        
    };
    
    //When play button is clicked on song row play song and change button to pause
    $scope.play = function($event, songNumber) {

        //Show pause button when play button is clicked 
        var td = $event.target;
        $(td).hide();
        $(td).next().show();
        
         
        
        //Send song number playerbar
        $scope.$broadcast('playSong', 
                          { songNumber: songNumber });
        
        
    };
    
}]);


// PLAYERBAR CONTROLLER ======================================================
myAppModule.controller('PlayerBarController', ['$scope', 'SongPlayer', function($scope, SongPlayer){
    
    $scope.player = SongPlayer;
    
    //When play button is clicked play song and change icon to pause
    $scope.play = function (songNumber) {
        
        $scope.playing = true; 
    };
    
    //When pause button is clicked pause song and change icon to play
    $scope.pause = function () {
        
        $scope.playing = false; 
    };
    
    //Get song number when play is clicked on ablum song row
    $scope.$on('playSong', function (event, args) {
        
        $scope.playing = true;
        SongPlayer.setSong(args.songNumber);

    });
    
    //Play next song and change song name
    $scope.nextSong = function() {
        SongPlayer.next();
        $scope.playing = true;
    };
    
    //Play previous song and change song name
    $scope.previousSong = function() {
        SongPlayer.previous();
        $scope.playing = true; 
    };
    
}]);


// SONGPLAYER SERVICE ======================================================
myAppModule.service('SongPlayer', function(){
    var currentAlbum = albumPicasso;
    var currentlyPlayingSongNumber;
    
    
    return {
        currentAlbum: currentAlbum,
        currentSong: null,
        
        setSong: function(songNumber) {
            this.songNumber = songNumber;
            this.currentSong = this.currentAlbum.songs[this.songNumber];
            currentSongFromAlbum = currentAlbum.songs[songNumber];
            currentlyPlayingSongNumber = this.songNumber;
        },
        
        //Change the song when the next button is clicked
        next: function() {

          var currentTrack = this.songNumber ;


          currentTrack++;

          if (currentTrack >= currentAlbum.songs.length) {
            currentTrack = 0;
          }
          this.setSong(currentTrack);
        },
        
        previous: function() {
          var currentTrack = this.songNumber ;

          currentTrack--;

          if (currentTrack < 0) {
            currentTrack = currentAlbum.songs.length - 1;
          }
          this.setSong(currentTrack);
        }
    }
});
