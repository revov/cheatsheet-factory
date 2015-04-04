angular.module('cheatsheet').controller('CreateCheatsheetController', [
    '$scope', 'Session', 'csfNotification', '$timeout',
    function($scope, Session, csfNotification, $timeout) {
        var createCheatsheet = this;

        createCheatsheet.cheatsheet = {
            type: 'cheatsheet',
            meta: {
                userId: null,
                name: '',
                description: '',
                permissions: {
                    view: ['member'],
                    edit: []
                }
            },
            content: []
        };

        Session.currentUserPromise().then(function(currentUser) {
            createCheatsheet.cheatsheet.meta.userId = currentUser._id;
        });

        createCheatsheet.submit = function() {
            createCheatsheet.state = 'loading';
            Cheatsheets.insert(createCheatsheet.cheatsheet, function(err, id) {
                $timeout(function() { $scope.$apply(function() {
                    if(err) {
                        createCheatsheet.errorMsg = err.message;
                        createCheatsheet.state = 'error';
                    } else {
                        createCheatsheet.state = 'success';
                        csfNotification.show(createCheatsheet.state, 'Success', 'You have successfully created a cheatsheet with ID: ' + id);
                    }
                });});
            });
        };

        $('#create-cheatsheet-form').form({
                name: {
                    identifier: 'name',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter cheatsheet name'
                        }
                    ]
                }
            },
            {
                on: 'blur',
                inline: 'true',
                onSuccess: function() {
                    $scope.$apply(createCheatsheet.submit);
                }
            }
        );

        $scope.$on('$destroy', function() {
            $('#create-cheatsheet-form').form('destroy');
        });

    }
]);