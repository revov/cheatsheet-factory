<nav ng-controller="MenuController as menu" class="ui fixed main menu inverted navbar">
    <a ui-sref="home" ui-sref-active="active" class="brand item">CheatSheet Factory<i class="home icon"></i></a>
    <a ui-sref="login" ui-sref-active="active" class="item">Login</a>
    <a ui-sref="cheatsheet" ui-sref-active="active" class="item" ng-show="CanI.viewPage('cheatsheet')">CheatSheet</a>
    <div class="right menu">
        <a class="item" ng-show="!!currentUser">
            <i class="user icon"></i> {{currentUser.username}}
        </a>
        <a class="ui item" ng-hide="!currentUser" ng-click="menu.logout()">
            Exit
        </a>
    </div>
</nav>