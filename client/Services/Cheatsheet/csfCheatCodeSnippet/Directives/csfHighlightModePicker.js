angular.module('cheatsheet')
    .directive('csfHighlightModePicker',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatCodeSnippet/Templates/csfHighlightModePicker.ng.html',
                scope: {
                    selectedMode: '=',
                    canEdit: '='
                },
                link: function(scope, element, attrs) {
                    scope.possibleModes = ace.require("ace/ext/modelist").modes;
                }
            };
        }
    );
