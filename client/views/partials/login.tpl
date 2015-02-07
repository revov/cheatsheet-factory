<div class="ui one column centered page grid">
    <div class="twelve wide column">
        <h3 class="ui top attached header">
            Cheatsheet Factory
        </h3>

        <div class="ui piled attached segment">
            <div id="login-form" class="ui form">
                <csf-form-error error-message="login.errorMsg" state="login.state"></csf-form-error>

                <div class="required field">
                    <label>Email:</label>

                    <div class="ui icon input">
                        <input placeholder="Email" ng-model="login.user.email" name="email" type="text"/>
                        <i class="mail icon"></i>
                    </div>
                </div>
                <div class="required field">
                    <label>Password:</label>

                    <div class="ui icon input">
                        <input placeholder="Password" ng-model="login.user.password" name="password"
                               type="password"/>
                        <i class="lock icon"></i>
                    </div>
                </div>

                <button class="ui labeled icon primary submit button">
                    <i class="icon user"></i>
                    Login
                </button>

                <button class="ui labeled icon secondary button" ng-click="login.createUser()">
                    <i class="icon user"></i>
                    Register
                </button>
            </div>
        </div>
    </div>
</div>
