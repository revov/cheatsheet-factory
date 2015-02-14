<div class="ui modal">
    <i class="close icon"></i>
    <div class="header">
        User Settings
    </div>
    <div class="content">
        <div class="ui vertical menu">
            <div class="header item">
                <i class="pen icon"></i>
                Editor
            </div>
            <a class="item" ng-class="{active: activeItem == 'editorTheme'}" ng-click="setActiveItem('editorTheme')">
                Theme
            </a>
            <a class="item" ng-class="{active: activeItem == 'editorFontSize'}" ng-click="setActiveItem('editorFontSize')">
                Font Size
            </a>
        </div>
        <div class="description">
            <div ng-switch="activeItem">
                <div ng-switch-when="editorTheme">
                    <div class="field">
                        <div class="ui fluid search selection dropdown">
                            <input name="editor-theme" type="hidden">
                            <i class="dropdown icon"></i>
                            <div class="default text">Select Ace Theme</div>
                            <div class="menu">
                                <div class="item" data-value="ad"><i class="ad flag"></i>Andorra</div>
                                <div class="item" data-value="ae"><i class="ae flag"></i>United Arab Emirates</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ng-switch-when="editorFontSize">
                    editorFontSize
                </div>
            </div>
        </div>
    </div>
    <div class="actions">
        <div class="ui black button">
            Cancel
        </div>
        <div class="ui positive right labeled icon button">
            Save
            <i class="checkmark icon"></i>
        </div>
    </div>
</div>