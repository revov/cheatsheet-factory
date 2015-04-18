angular.module('cheatsheet').controller('CheatsheetController', [
    '$scope', 'csfNotification', '$state', 'csfMeteor',
    function($scope, csfNotification, $state, csfMeteor) {
        var cheatsheet = this;

        var cheatsheetsSubscription = csfMeteor.subscribe( $scope, 'cheatsheets' );
        cheatsheetsSubscription
            .then(function() {
                cheatsheet.cheatsheets = csfMeteor.collection( $scope, Cheatsheets, false );
                cheatsheet.userNames = csfMeteor.collection( $scope, Meteor.users, false );
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
    }
]);