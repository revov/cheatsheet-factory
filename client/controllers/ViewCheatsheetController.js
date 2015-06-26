angular.module('cheatsheet').controller('ViewCheatsheetController', [
    '$scope', '$stateParams', '$state', 'csfNotification',
    function($scope, $stateParams, $state, csfNotification) {
        var viewCheatsheet = this;
        viewCheatsheet.id = $stateParams.id;

        $scope.$meteorSubscribe( 'view-cheatsheet', viewCheatsheet.id );
        viewCheatsheet.cheatsheet = $scope.$meteorObject( Cheatsheets, viewCheatsheet.id, false );

        /**
         * Save button
         */
        viewCheatsheet.save = function() {
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
            viewCheatsheet.cheatsheet.reset();
            csfNotification.show('info', 'Changes discarded.');
        };

        /**
         * Delete button
         */
        viewCheatsheet.delete = function() {
            viewCheatsheet.cheatsheet.$$collection.remove(viewCheatsheet.cheatsheet._id, function(err) {
                if(err) {
                    csfNotification.show('error', 'There was an error deleting the cheatsheet.', err.message);
                } else {
                    csfNotification.show('success', 'Successfully deleted cheatsheet.');
                    $state.go('cheatsheet');
                }
            });
        };
    }
]);