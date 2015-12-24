Cheatsheet Factory
------------------
Author: Stoyan Revov

What is Cheatsheet Factory?
---------------------------
Cheatsheet Factory is a realtime reactive web application made with Meteor and Angular for creating and sharing Cheatsheets.
It can be used by single users as well as hosted and utilised in large organisations.
It was a four month project created for my bachelor's thesis in the beginning of 2015.

How to install?
---------------
- Install meteor
  - `curl https://install.meteor.com/ | sh`
- Clone this repo `git clone git@github.com:revov/cheatsheet-factory.git`
- Enter the directory `cd cheatsheet-factory`
- Pull the git submodules (There was no working Meteor package for Ace editor so I had to create a local one):
  - `git submodule update --init --recursive`
- Start the application by executing `meteor` and wait for all dependencies to be downloaded.
- In another terminal tab open `meteor shell` while the application is running.
- Run the migrations by executing `Migrations.migrateTo('latest');` in the meteor shell.
  - If you get stuck open the `meteor mongo` tool and execute `db.migrations.update({_id:"control"}, {$set:{"locked":false}});`
- Open the application in your favourite web browser on http://localhost:3000/
- Create an initial user. To give this user admin and dev permissions open the `meteor shell` and run `Roles.addUsersToRoles("<userId>", ['admin', 'dev']);` where `<userId>` is the ID of your initial user. You can check it by running `Meteor.userId()` in the browser's dev console. You should immediately see 2 new tabs in the Cheatsheet Factory application ("Administration" and "dev").

Main Features
-------------
- Create and share interactive cheatsheets composed of different components (code snippets, markdown) in various layouts.
- Export cheatsheets to JSON.
- User and group management. Choose who can view or edit your cheatsheets.
- All parts of the application are reactive. Every action takes effect immediately (for example revoking edit permissions on a cheatsheet opened by another user immediately disables the other user's controls)

Technologies
------------
Cheatsheet Factory is built with the following technologies:
- Meteor
- Angular 1
- Semantic UI
- Ace Editor
- marked
