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
        isPlaying: false,
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
          this.isPlaying = true;

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
        },
          
          updateSeekPercentage: function (seekBar, seekBarFillRatio){
              var offsetXPercent = seekBarFillRatio * 100;
              offsetXPercent = Math.max(0, offsetXPercent);
              offsetXPercent = Math.min(100, offsetXPercent);
              var percentageString = offsetXPercent + '%';
              seekBar.getElementsByClassName('fill')[0].style.width = percentageString;
              seekBar.getElementsByClassName('thumb')[0].style.left = percentageString;
            }
      }
});