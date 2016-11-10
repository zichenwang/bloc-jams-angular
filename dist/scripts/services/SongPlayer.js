 (function () {
     function SongPlayer() {
         var SongPlayer = {};

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

         SongPlayer.play = function (song) {
             if (currentSong !== song) {

                 setSong(song);

                 //Set the newly chosen song object as the currentSong
                 currentSong = song;

                 //Play the new Buzz sound object
                 currentBuzzObject.play();
                 song.playing = true;

             } else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
                 }
             }
         };

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