angular.module('cheatsheet')
    .factory('csfMeteor', [
        '$meteor', '$q',
        function($meteor, $q) {
            return {
                subscribe: function( scope, subscriptionParams /*variadic*/ ) {
                    var deferred = $q.defer();
                    var args = _.takeRight(arguments, arguments.length-1);
                    args.push({
                        onReady: function () {
                            deferred.resolve(subscriptionHandle);
                        },
                        onError: deferred.reject
                    });

                    var subscriptionHandle = Meteor.subscribe.apply( this, args );
                    scope.$on('$destroy', function() {
                        subscriptionHandle.stop();
                    });

                    return deferred.promise;
                },
                collection: function( scope, collectionParams /*variadic*/ ) {
                    var collection = $meteor.collection.apply( this, _.takeRight(arguments, arguments.length-1) );
                    scope.$on('$destroy', function() {
                        collection.stop();
                    });

                    return collection;
                },
                object: function( scope, objectParams /*variadic*/ ) {
                    var object = $meteor.object.apply( this, _.takeRight(arguments, arguments.length-1) );
                    scope.$on('$destroy', function() {
                        object.stop();
                    });

                    return object;
                }
            };
        }
    ]);
