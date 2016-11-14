 (function () {
     function SongPlayer($rootScope, Fixtures) {
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
                 stopSong(SongPlayer.currentSong);
             }

             //Set a new Buzz sound object.
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentBuzzObject.bind('timeupdate', function () {
                 $rootScope.$apply(function () {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
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
          *@function stopSong
          *@desc Stop playing the current Buzz object and set playing property to null
          *@param {Object} song
          */
         var stopSong = function (song) {
             currentBuzzObject.stop();
             song.playing = null;
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
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
         SongPlayer.currentTime = null;

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
             song.playing = null;
         };

         /**
          *@function previous
          *@desc go to the previous song and play it
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

         /**
          *@function next 
          *@desc go to the next song and play it
          */
         SongPlayer.next = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             if (currentSongIndex > currentAlbum.songs.length - 1) {
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

         /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
         SongPlayer.setCurrentTime = function (time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };



         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();