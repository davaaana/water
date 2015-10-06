'use strict';

// Authentication service for user variables
angular.module('admin').factory('Authentication', [
    function() {
        var _this = this;
        var user_roles = {
            admin:      1
        };
        _this._data = {
            user: window.user
        };
        return {
            user: _this._data.user,
            user_roles: user_roles,
            authorize: function(role) {
                var user = _this._data.user || null;

                if (user && (role == user.role_id)) {return true;}
                else {return false;}
            }
        };
    }
]);