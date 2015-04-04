angular.module('cheatsheet').controller('ViewCheatsheetController', [
    '$scope', '$meteor', '$stateParams', 'csfNotification',
    function($scope, $meteor, $stateParams, csfNotification) {
        var viewCheatsheet = this;
        viewCheatsheet.id = $stateParams.id;

        var cheatsheetPromise = $meteor.subscribe('view-cheatsheet', viewCheatsheet.id);
        var cheatsheetSubscriptionHandle;

        cheatsheetPromise
            .then(function(value) {
                cheatsheetSubscriptionHandle = value;
                viewCheatsheet.cheatsheet = $meteor.object(Cheatsheets, viewCheatsheet.id, false);
            });

        viewCheatsheet.save = function() {
            if( !viewCheatsheet.cheatsheet ) {
                return;
            }

            csfNotification.show('info', 'Saving cheatsheet.', 'Please wait...');
            viewCheatsheet.cheatsheet.save()
                .then(
                    function(success) {
                        csfNotification.show('success', 'Cheatsheet successfully saved.');
                    },
                    function(error) {
                        csfNotification.show('error', 'There was an error saving the cheatsheet.', error);
                    }
                );
        };

        viewCheatsheet.reset = function() {
            if( !viewCheatsheet.cheatsheet ) {
                return;
            }

            viewCheatsheet.cheatsheet.reset();
            csfNotification.show('info', 'Changes discarded.');
        };

        $scope.$on('$destroy', function() {
            cheatsheetPromise.then(function() {
                viewCheatsheet.cheatsheet.stop();
                cheatsheetSubscriptionHandle.stop();
            });
        });

    }
]);