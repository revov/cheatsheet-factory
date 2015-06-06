/**
 * This set of directives provide a way to initialize (and automatically destroy) Semantic modules
 *
 * For example, if you want to initialize a modal, place the csf-semantic-modal directive on the target element
 */
var module = angular.module('cheatsheet');
var SUPPORTED_SEMANTIC_MODULES = [
    'Tab',
    'Form'
    // Add more on demand
];

_.forEach(SUPPORTED_SEMANTIC_MODULES, function( item ) {
    var directiveName = 'csfSemantic' + item;
    var semanticComponent = angular.lowercase(item);
    module.directive(directiveName, [
        '$parse',
        function($parse) {
            return {
                restrict : 'A',
                link: function(scope, element, attrs) {
                    var params = $parse(attrs[directiveName])(scope);
                    // This was introduced to fix a problem where a tab was initialized before its attaches segment was created
                    setTimeout(function() {
                        element[semanticComponent].apply(element, params);
                    }, 0);

                    element.on('$destroy', function() {
                        element[semanticComponent]('destroy');
                    });
                }
            };
        }
    ]);
});