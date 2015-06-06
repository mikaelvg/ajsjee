'use strict';

angular.module('ajsjeeApp')
        .factory('appuserFactory', ['$http', 'sessionService', function($http, sessionService) {

                var urlBase = '/webresources/rest.appuser';
                var appuserFactory = {};

                appuserFactory.getAppuserById = function(loginId, appuserId) {
                    return $http({
                        url: urlBase + '/' + appuserId,
                        method: 'GET',
                        headers: {'loginId': '' + loginId}
                    });
                };

                appuserFactory.createAppuser = function(accessToken, appuser) {
                    return $http({
                        url: urlBase,
                        method: 'POST',
                        data: appuser,
                        headers: {'Authorization': '' + accessToken + ''}
                    });
                };

                appuserFactory.updateAppuser = function(accessToken, loginId, appuser) {
                    return $http({
                        url: urlBase,
                        method: 'PUT',
                        data: appuser,
                        headers: {'Authorization': '' + accessToken + '',
                            'loginId': '' + loginId,
                            'oauthProvider': '' + sessionService.getAppuser().oauthProvider,
                            'accountId': '' + sessionService.getAppuser().accountId
                        }
                    });
                };

                return appuserFactory;
            }]);