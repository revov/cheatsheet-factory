angular.module('cheatsheet').controller('CheatsheetController', [
    '$scope', '$meteor',
    function($scope, $meteor) {
        var cheatsheet = this;
        var cheatsheetsPromise = $meteor.subscribe('cheatsheets');
        var cheatsheetsSubscriptionHandle;
        var userNamesPromise;
        var userNamesSubscriptionHandle;

        cheatsheetsPromise
            .then(function(value) {
                cheatsheetsSubscriptionHandle = value;
                cheatsheet.cheatsheets = $meteor.collection(Cheatsheets, false);

                var userIds = _.uniq(_.map(cheatsheet.cheatsheets, function (element) { return element.meta.userId; }));
                userNamesPromise = $meteor.subscribe('user-names', userIds);

                return userNamesPromise;
            })
            .then(function(value) {
                userNamesSubscriptionHandle = value;
                cheatsheet.userNames = $meteor.collection(Meteor.users, false);
            });

        cheatsheet.getUserProfile = function(userId) {
            if(!cheatsheet.userNames) {
                return null;
            }

            return _.where(cheatsheet.userNames, {_id: userId})[0].profile;
        };

        $scope.$on('$destroy', function() {
            cheatsheetsPromise.then(function() {
                console.log('Stopping cheatsheet subscription');
                cheatsheet.cheatsheets.stop();
                cheatsheetsSubscriptionHandle.stop();
            });
            userNamesPromise.then(function() {
                console.log('Stopping userNames subscription');
                cheatsheet.userNames.stop();
                userNamesSubscriptionHandle.stop();
            });
        });

    }
]);