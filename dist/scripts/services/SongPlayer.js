 (function () {
     function SongPlayer() {
         var SongPlayer = {};

         /**
          * @desc Currently Playing song
          * @type {Object}
          */
         var currentSong = null;

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
                 currentSong.playing = null;
             }

             //Set a new Buzz sound object.
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentSong = song;
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
          *@function play
          *@desc public methods to play a song
          *@param {Object} song
          */
         SongPlayer.play = function (song) {
             if (currentSong !== song) {

                 setSong(song);

                 //Set the newly chosen song object as the currentSong
                 currentSong = song;

                 playSong(song);

             } else if (currentSong === song) {
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
             currentBuzzObject.pause();
             song.playing = false;
         };



         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();