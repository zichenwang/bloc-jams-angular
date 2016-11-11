 (function () {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
          * @desc album information
          * @type {Object}
          */
         var currentAlbum = Fixtures.getAlbum();

         /**
          * @desc Buzz object audio file
          * @type {Object}
          */
         var currentBuzzObject = null;

         /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         var setSong = function (song) {
             //Stop the currently playing song, if there is one
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }

             //Set a new Buzz sound object.
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
         };

         /**
          *@function playSong
          *@desc Play the current Buzz object and set playing property to true
          *@param {Object} song
          */
         var playSong = function (song) {
             currentBuzzObject.play();

             song.playing = true;
         };

         /**
          *@function getSongIndex
          *@desc get the index of a song
          *@param {Object} song
          */
         var getSongIndex = function (song) {
             return currentAlbum.songs.indexOf(song);
         };

         /**
          * @desc Currently Playing song
          * @type {Object}
          */
         SongPlayer.currentSong = null;

         /**
          *@function play
          *@desc public methods to play a song
          *@param {Object} song
          */
         SongPlayer.play = function (song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {

                 setSong(song);

                 //Set the newly chosen song object as the currentSong
                 SongPlayer.currentSong = song;

                 playSong(song);

             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
                 }
             }
         };


         /**
          *@function pause
          *@desc public methods to pause the currently playing song
          *@param {Object} song
          */
         SongPlayer.pause = function (song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         /**
          *@function previous
          *@desc go to the previous song
          */
         SongPlayer.previous = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 //stop the currently playing song
                 currentBuzzObject.stop();
                 //set the value of the currently playing song to the first song
                 SongPlayer.currentSong.playing = null;
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }

         };



         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();