angular.module('cheatsheet').controller('CheatsheetController', [
    '$scope', '$meteor', 'csfNotification', '$state',
    function($scope, $meteor, csfNotification, $state) {
        var cheatsheet = this;
        var cheatsheetsPromise = $meteor.subscribe('cheatsheets');
        var cheatsheetsSubscriptionHandle;
        var userNamesPromise;
        var userNamesSubscriptionHandle;

        cheatsheetsPromise
            .then(function(value) {
                cheatsheetsSubscriptionHandle = value;
                cheatsheet.cheatsheets = $meteor.collection(Cheatsheets, false);

                var userIds = _.uniq(_.map(cheatsheet.cheatsheets, function (element) { return element.meta.userId; })); //TODO: make this reactive
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

        cheatsheet.createNew = function() {
            var sampleCheatsheet = {
                type: 'cheatsheet',
                meta: {
                    userId: Meteor.userId(),
                    name: 'Unknown name',
                    description: 'Github flavoured markdown',
                    permissions: {
                        view: [],
                        edit: []
                    }
                },
                content: []
            };
            Cheatsheets.insert(sampleCheatsheet, function(err, id) {
                if(err) {
                    csfNotification.show('error', 'There was an error creating a cheatsheet:', err.message);
                } else {
                    csfNotification.show('success', 'Success', 'You have successfully created a cheatsheet with ID: ' + id);
                    $state.go('view-cheatsheet', {id: id });
                }
            });
        };

        $scope.$on('$destroy', function() {
            cheatsheetsPromise.then(function() {
                cheatsheet.cheatsheets.stop();
                cheatsheetsSubscriptionHandle.stop();
            });
            userNamesPromise.then(function() {
                cheatsheet.userNames.stop();
                userNamesSubscriptionHandle.stop();
            });
        });

    }
]);