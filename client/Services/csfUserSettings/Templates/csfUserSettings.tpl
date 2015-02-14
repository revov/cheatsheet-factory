<div class="ui modal">
    <i class="close icon"></i>
    <div class="header">
        User Settings
    </div>
    <div class="content">
        <div class="ui vertical menu">
            <a class="item" ng-class="{active: activeItem == 'editorTheme'}" ng-click="setActiveItem('editorTheme')">
                Theme
            </a>
            <a class="item" ng-class="{active: activeItem == 'editorFontSize'}" ng-click="setActiveItem('editorFontSize')">
                Font Size
            </a>
        </div>
        <div class="description">

            <!-- Editor Theme -->
            <div ng-show="activeItem == 'editorTheme'">
                <div class="ui fluid search selection dropdown">
                    <input name="editor-theme" type="hidden" ng-model="UserSettings.editor.theme">
                    <i class="dropdown icon"></i>
                    <div class="default text">Select Ace Theme</div>
                    <div class="menu">
                        <div ng-repeat="(key, value) in themelist" class="item" data-value="{{value.theme}}">{{value.caption}}</div>
                    </div>
                </div>
            </div>

            <!-- Editor Font Size -->
            <div ng-show="activeItem == 'editorFontSize'">
                editorFontSize
            </div>


        </div>
    </div>
    <div class="actions" >
        <div class="ui black button">
            Cancel
        </div>
        <div class="ui positive right labeled icon button">
            Save
            <i class="checkmark icon"></i>
        </div>
    </div>
</div>