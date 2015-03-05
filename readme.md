
Install meteor
=============================================================
curl https://install.meteor.com/ | sh
meteor create cheatsheet-manager


Meteor Packages
=============================================================
meteor add urigo:angular
meteor add semantic:ui-css
meteor add accounts-password

meteor add mquandalle:bower
meteor add mandrill:ace
meteor add aldeed:collection2

meteor add alanning:roles

Meteor Privacy
=============================================================
meteor remove insecure
meteor remove autopublish

Git submodules
=============================================================
cd packages
git submodule add https://github.com/ajaxorg/ace-builds.git
#Once someone else pulls our repo they need to do:
git submodule init
git submodule update --remote
git submodule foreach git pull


=============================================================
git mv ./client/views/partials/home.tpl ./client/views/partials/home.ng.html
git mv ./client/views/partials/menu.tpl ./client/views/partials/menu.ng.html
git mv ./client/views/partials/403.tpl ./client/views/partials/403.ng.html
git mv ./client/views/partials/login.tpl ./client/views/partials/login.ng.html
git mv ./client/views/partials/notification.tpl ./client/views/partials/notification.ng.html
git mv ./client/views/partials/cheatsheet.tpl ./client/views/partials/cheatsheet.ng.html
git mv ./client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.tpl ./client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.ng.html
git mv ./client/Services/csfUserSettings/Templates/csfUserSettings.tpl ./client/Services/csfUserSettings/Templates/csfUserSettings.ng.html
git mv ./client/Services/csfNotification/Templates/csfNotification.tpl ./client/Services/csfNotification/Templates/csfNotification.ng.html
git mv ./client/Services/csfFormError/Templates/csfFormError.tpl ./client/Services/csfFormError/Templates/csfFormError.ng.html

-------------------------------

git mv ./client/views/partials/home.ng.html ./client/views/partials/home.tpl
git mv ./client/views/partials/menu.ng.html ./client/views/partials/menu.tpl
git mv ./client/views/partials/403.ng.html ./client/views/partials/403.tpl
git mv ./client/views/partials/login.ng.html ./client/views/partials/login.tpl
git mv ./client/views/partials/notification.ng.html ./client/views/partials/notification.tpl
git mv ./client/views/partials/cheatsheet.ng.html ./client/views/partials/cheatsheet.tpl
git mv ./client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.ng.html ./client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.tpl
git mv ./client/Services/csfUserSettings/Templates/csfUserSettings.ng.html ./client/Services/csfUserSettings/Templates/csfUserSettings.tpl
git mv ./client/Services/csfNotification/Templates/csfNotification.ng.html ./client/Services/csfNotification/Templates/csfNotification.tpl
git mv ./client/Services/csfFormError/Templates/csfFormError.ng.html ./client/Services/csfFormError/Templates/csfFormError.tpl

===============================

git mv ./client/views/partials/home.tpl ./client/views/partials/home.nghtml
git mv ./client/views/partials/menu.tpl ./client/views/partials/menu.nghtml
git mv ./client/views/partials/403.tpl ./client/views/partials/403.nghtml
git mv ./client/views/partials/login.tpl ./client/views/partials/login.nghtml
git mv ./client/views/partials/notification.tpl ./client/views/partials/notification.nghtml
git mv ./client/views/partials/cheatsheet.tpl ./client/views/partials/cheatsheet.nghtml
git mv ./client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.tpl ./client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.nghtml
git mv ./client/Services/csfUserSettings/Templates/csfUserSettings.tpl ./client/Services/csfUserSettings/Templates/csfUserSettings.nghtml
git mv ./client/Services/csfNotification/Templates/csfNotification.tpl ./client/Services/csfNotification/Templates/csfNotification.nghtml
git mv ./client/Services/csfFormError/Templates/csfFormError.tpl ./client/Services/csfFormError/Templates/csfFormError.nghtml

-------------------------------

git mv ./client/views/partials/home.nghtml ./client/views/partials/home.tpl
git mv ./client/views/partials/menu.nghtml ./client/views/partials/menu.tpl
git mv ./client/views/partials/403.nghtml ./client/views/partials/403.tpl
git mv ./client/views/partials/login.nghtml ./client/views/partials/login.tpl
git mv ./client/views/partials/notification.nghtml ./client/views/partials/notification.tpl
git mv ./client/views/partials/cheatsheet.nghtml ./client/views/partials/cheatsheet.tpl
git mv ./client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.nghtml ./client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.tpl
git mv ./client/Services/csfUserSettings/Templates/csfUserSettings.nghtml ./client/Services/csfUserSettings/Templates/csfUserSettings.tpl
git mv ./client/Services/csfNotification/Templates/csfNotification.nghtml ./client/Services/csfNotification/Templates/csfNotification.tpl
git mv ./client/Services/csfFormError/Templates/csfFormError.nghtml ./client/Services/csfFormError/Templates/csfFormError.tpl