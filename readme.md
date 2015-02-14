
Install meteor
=============================================================
curl https://install.meteor.com/ | sh
meteor create cheatsheet-manager


Meteor Packages
=============================================================
meteor add urigo:angular
meteor add nooitaf:semantic-ui
meteor add accounts-password

meteor add mquandalle:bower
meteor add mandrill:ace
meteor add aldeed:collection2


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
git submodule update