'use strict';
angular.module('ajsjeeApp')
        .factory('oauthFactory', ['$http', 'sessionService', function($http, sessionService) {

                var urlBase = '/webresources/rest.oauth';
                var oauthFactory = {};

                oauthFactory.getOauthByAppuserId = function(accessToken, loginId, appuserId) {
                    return $http({
                        url: urlBase + '/appuser/' + appuserId,
                        method: 'GET',
                        headers: {'Authorization': '' + accessToken + '', 'loginId': '' + loginId}
                    });
                };

                oauthFactory.createNewAccount = function(accessToken, oauth) {
                    return $http({
                        url: urlBase + "/newaccount/",
                        method: 'POST',
                        data: oauth,
                        headers: {'Authorization': '' + accessToken + ''}
                    });
                };

                oauthFactory.createOauth = function(accessToken, loginId, oauth) {
                    return $http({
                        url: urlBase + "/oauth/",
                        method: 'POST',
                        data: oauth,
                        headers: {'Authorization': '' + accessToken + '', 'loginId': '' + loginId}
                    });
                };

                oauthFactory.removeOauth = function(accessToken, loginId, oauthId) {
                    return $http({
                        url: urlBase + "/" + oauthId,
                        method: 'DELETE',
                        headers: {'Authorization': '' + accessToken + '',
                            'loginId': '' + loginId,
                            'oauthProvider': '' + sessionService.getAppuser().oauthProvider,
                            'accountId': '' + sessionService.getAppuser().accountId
                        }
                    });
                };

                oauthFactory.getToken = function(accessToken, loginId, code) {
                    return $http({
                        url: urlBase + '/token/' + code,
                        method: 'GET',
                        headers: {'Authorization': '' + accessToken + '',
                            'loginId': '' + loginId,
                            'oauthProvider': '' + sessionService.getAppuser().oauthProvider,
                            'accountId': '' + sessionService.getAppuser().accountId
                        }
                    });
                };

                return oauthFactory;
            }]);