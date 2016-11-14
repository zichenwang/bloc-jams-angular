 (function () {
     function seekBar($document) {
         //Calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occurred.
         var calculatePercent = function (seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = offsetX / seekBarWidth;
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(1, offsetXPercent);
             return offsetXPercent;
         };

         return {
             templateUrl: '/templates/directives/seek_bar.html',
             replace: true,
             restrict: 'E',
             scope: {
                 onChange: '&'
             },
             link: function (scope, element, attributes) {
                 scope.value = 0; //the value of the seek bar
                 scope.max = 100; //the maximum value of the song

                 var seekBar = $(element);

                 attributes.$observe('value', function (newValue) {
                     scope.value = newValue;
                 });

                 attributes.$observe('max', function (newValue) {
                     scope.max = newValue;
                 });

                 //calculates a percent based on the value and maximum value of a seek bar
                 var percentString = function () {
                     var value = scope.value;
                     var max = scope.max;
                     var percent = value / max * 100;
                     return percent + "%";
                 };

                 //Returns the width of the seek bar fill element based on the calculated percent
                 scope.fillStyle = function () {
                     return {
                         width: percentString()
                     };
                 };

                 //Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar.
                 scope.onClickSeekBar = function (event) {
                     var percent = calculatePercent(seekBar, event);
                     scope.value = percent * scope.max;
                     notifyOnChange(scope.value);
                 };

                 scope.trackThumb = function () {
                     $document.bind('mousemove.thumb', function (event) {
                         var percent = calculatePercent(seekBar, event);
                         scope.$apply(function () {
                             scope.value = percent * scope.max;
                             notifyOnChange(scope.value);
                         });
                     });

                     $document.bind('mouseup.thumb', function () {
                         $document.unbind('mousemove.thumb');
                         $document.unbind('mouseup.thumb');
                     });
                 };

                 var notifyOnChange = function (newValue) {
                     if (typeof scope.onChange === 'function') {
                         scope.onChange({
                             value: newValue
                         });
                     }
                 };

                 scope.thumbStyle = function () {
                     return {
                         left: scope.value + '%'
                     };
                 };
             }
         };
     }

     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();