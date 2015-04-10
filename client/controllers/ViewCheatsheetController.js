angular.module('cheatsheet').controller('ViewCheatsheetController', [
    '$scope', '$meteor', '$stateParams', '$state', 'csfNotification',
    function($scope, $meteor, $stateParams, $state, csfNotification) {
        var viewCheatsheet = this;
        viewCheatsheet.id = $stateParams.id;

        var cheatsheetPromise = $meteor.subscribe('view-cheatsheet', viewCheatsheet.id);
        var cheatsheetSubscriptionHandle;

        cheatsheetPromise
            .then(function(value) {
                cheatsheetSubscriptionHandle = value;
                viewCheatsheet.cheatsheet = $meteor.object(Cheatsheets, viewCheatsheet.id, false);
            });

        /**
         * Save button
         */
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

        /**
         * Reset button
         */
        viewCheatsheet.reset = function() {
            if( !viewCheatsheet.cheatsheet ) {
                return;
            }

            viewCheatsheet.cheatsheet.reset();
            csfNotification.show('info', 'Changes discarded.');
        };

        /**
         * Delete button
         */
        viewCheatsheet.delete = function() {
            if( !viewCheatsheet.cheatsheet ) {
                return;
            }

            viewCheatsheet.cheatsheet.$$collection.remove(viewCheatsheet.cheatsheet._id, function(err) {
                if(err) {
                    csfNotification.show('error', 'There was an error deleting the cheatsheet.', err.message);
                } else {
                    csfNotification.show('success', 'Successfully deleted cheatsheet.');
                    $state.go('cheatsheet');
                }
            });
        };

        $scope.$on('$destroy', function() {
            cheatsheetPromise.then(function() {
                viewCheatsheet.cheatsheet.stop();
                cheatsheetSubscriptionHandle.stop();
            });
        });

    }
]);