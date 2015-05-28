angular.module('cheatsheet').controller('CheatsheetController', [
    '$scope', 'csfNotification', '$state',
    function($scope, csfNotification, $state) {
        var cheatsheet = this;

        var cheatsheetsSubscription = $scope.$meteorSubscribe( 'cheatsheets' );
        cheatsheetsSubscription
            .then(function() {
                cheatsheet.cheatsheets = $scope.$meteorCollection( Cheatsheets, false );
                cheatsheet.userNames = $scope.$meteorCollection( Meteor.users, false );
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