angular.module('cheatsheet')
    .directive('csfRandomColorBorder',
        function() {
            return {
                restrict : 'A',
                link: function(scope, element, attrs) {
					element
						.css('border', '3px solid ' + randomColor({luminosity: 'light'}) )
						.css('border-radius', '10px');
                }
            };
        }
    );
