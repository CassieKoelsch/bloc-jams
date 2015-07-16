// SLIDER DIRECTIVE ================================================   
myAppModule.directive('mySlider', function () {
       return {
           restrict: 'E',
           scope: {
           info: '=info'
           },
           templateUrl: 'scripts/directives/slider.html',
           link: function (scope, element, attributes) {

               var $element = $(element);
               window.skope = scope;
               scope.updateSeekPercentage = function(ratio) {
                   var offsetXPercent = ratio * 100;
                   offsetXPercent = Math.max(0, offsetXPercent);
                   offsetXPercent = Math.min(100, offsetXPercent);

                   return offsetXPercent + '%';
               };

               scope.fillRatio = function (event) {
                   var set = event.pageX - $element.offset().left;
                   var barWidth = $element.children().width();
                   return set / barWidth;
               };

               scope.fillStyle = function () {
                   return {
                       width: scope.updateSeekPercentage(scope.info)
                   };
               }

               scope.thumbStyle = function () {
                   return {
                       left: scope.updateSeekPercentage(scope.info)
                   };
               }

               scope.press = function(event) {
                   scope.info = scope.fillRatio(event);
                   var percentageString = scope.updateSeekPercentage(scope.info);
                   $element.find('.fill').width(percentageString);
                   $element.find('.thumb').css({left: percentageString});
               }

               scope.mousedown = function (event) {
                   event.preventDefault();
                   $(document).on('mousemove', scope.press);
                   $(document).on('mouseup', scope.mouseup);
               };

               scope.mouseup = function () {
                   $(document).off('mousemove', scope.press);
                   $(document).off('mouseup', scope.mouseup);
               };
               
               var percentageString = scope.updateSeekPercentage(scope.info);
               $element.find('.fill').width(percentageString);
               $element.find('.thumb').css({left: percentageString});
           }
       }
   });