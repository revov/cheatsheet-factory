
Install meteor
==============
curl https://install.meteor.com/ | sh
meteor create cheatsheet-manager

Git submodules
==============
cd packages
git submodule add https://github.com/ajaxorg/ace-builds.git
#Once someone else pulls our repo they need to do:
git submodule init
git submodule update --remote
git submodule foreach git pull

Migrations
==========
Migrations.migrateTo('latest');
#when stuck
meteor mongo
db.migrations.update({_id:"control"}, {$set:{"locked":false}});
exit

Meteor Privacy
==============
meteor remove insecure
meteor remove autopublish

Meteor Packages
===============
meteor add urigo:angular
meteor add semantic:ui-css
meteor add accounts-password

meteor add mquandalle:bower
meteor add mandrill:ace
meteor add aldeed:collection2

meteor add alanning:roles
meteor add email
meteor add rzymek:randomcolor
meteor add percolate:migrations

meteor add matb33:collection-hooks

meteor add cfs:standard-packages
meteor add cfs:gridfs

meteor add chrismbeckett:toastr