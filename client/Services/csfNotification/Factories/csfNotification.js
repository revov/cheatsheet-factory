angular.module('cheatsheet')
    .factory('csfNotification',
        function() {
            toastr.options.showEasing = 'swing';
            toastr.options.hideEasing = 'swing';
            toastr.options.showMethod = 'slideDown';
            toastr.options.hideMethod = 'slideUp';
            toastr.options.timeOut = 10000;
            toastr.options.showDuration = 150;
            toastr.options.hideDuration = 300;

            return {
                show: function(type, header, message) {
                    toastr[type](message, header);
                }
            };
        }
    );
