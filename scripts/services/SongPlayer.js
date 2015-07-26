// SONG PLAYER SERVICE ======================================================

myAppModule.service('SongPlayer', function () {
   
    //Set the currently playing album 
    var currentAlbum = albumPicasso;
    var currentlyPlayingSongNumber;
    
      return {
        currentAlbum: currentAlbum,
        currentSoundFile: null,
        volume: 80,
        currentSong: null,
        listeners: [],
          //Play the currentSoundFile 
        play: function() {

          this.currentSoundFile.play();
        },
          //Pause the currentSoundFile
        pause: function() {

          this.currentSoundFile.pause();
        },
          //Set the song that is playing to current
        setSong: function(songNumber) {

          if (this.currentSoundFile) {
            this.currentSoundFile.stop();
          }

          this.songNumber = songNumber;
          this.currentSong = this.currentAlbum.songs[this.songNumber];
          currentSongFromAlbum = currentAlbum.songs[songNumber];
          this.currentlyPlayingSongNumber = songNumber;

          var self = this;
          if (this.currentSoundFile !== null){
            this.listeners.forEach(function(listener){
              self.currentSoundFile.unbind(listener[0], listener[1]);
            });
          }

          this.currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl,                {
            formats: ['mp3'],
            preload: true
          });
          this.currentSoundFile.setVolume(this.volume);
          this.currentSoundFile.play();

          this.listeners.forEach(function(listener){
            self.currentSoundFile.bind(listener[0], listener[1]);
          });
        },
          //Set the volume
        setVolume: function(volume) {
          if (this.currentSoundFile) {
            this.currentSoundFile.setVolume(volume);
          }
          this.volume = volume;
        },
          //Change the song when the next button is clicked
        next: function() {

          var currentTrack = this.songNumber ;

          if (this.currentSoundFile) {
            this.currentSoundFile.stop();
          }
          currentTrack++;

          if (currentTrack >= currentAlbum.songs.length) {
            currentTrack = 0;
          }
          this.setSong(currentTrack);
        },
          //Change the song when the previous button is clicked
        previous: function() {
          var currentTrack = this.songNumber ;
          if (this.currentSoundFile) {
            this.currentSoundFile.stop();
          }
          currentTrack--;

          if (currentTrack < 0) {
            currentTrack = currentAlbum.songs.length - 1;
          }
          this.setSong(currentTrack);
        },

        addListener: function(eventName, fn){
          this.listeners.push([eventName, fn]);
        },
          //Get the current time and total time to set the seek bar 
        getProgress: function() {
            if(this.currentSoundFile) {
            return this.currentSoundFile.getTime() / this.currentSoundFile.getDuration();
            } else {
                return 0;
            }
        }
      }
});