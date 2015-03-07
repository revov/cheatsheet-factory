angular.module('cheatsheet').controller('ViewCheatsheetController', [
    '$scope', '$meteor', '$stateParams',
    function($scope, $meteor, $stateParams) {
        var viewCheatsheet = this;
        viewCheatsheet.id = $stateParams.id;

        var cheatsheetPromise = $meteor.subscribe('view-cheatsheet', viewCheatsheet.id);
        var cheatsheetSubscriptionHandle;

        cheatsheetPromise
            .then(function(value) {
                cheatsheetSubscriptionHandle = value;
                viewCheatsheet.cheatsheet = $meteor.object(Cheatsheets, viewCheatsheet.id, false);
            });

        $scope.$on('$destroy', function() {
            cheatsheetPromise.then(function() {
                viewCheatsheet.cheatsheet.stop();
                cheatsheetSubscriptionHandle.stop();
            });
        });

    }
]);