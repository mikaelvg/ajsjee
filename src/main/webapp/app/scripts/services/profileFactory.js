'use strict';
angular.module('ajsjeeApp')
        .factory('profileFactory', ['$http', 'sessionService', function($http, sessionService) {

                var urlBase = '/webresources/rest.profile';
                var profileFactory = {};

                profileFactory.getProfileByAppuserId = function(loginId, appuserId) {
                    return $http({
                        url: urlBase + '/appuser/' + appuserId,
                        method: 'GET',
                        headers: {'loginId': '' + loginId}
                    });
                };

                profileFactory.getProfileByUrlId = function(urlId) {
                    return $http({
                        url: urlBase + '/urlid/' + urlId,
                        method: 'GET'
                    });
                };

                profileFactory.createProfile = function(accessToken, loginId, profile) {
                    return $http({
                        url: urlBase,
                        method: 'POST',
                        data: profile,
                        headers: {'Authorization': '' + accessToken + '',
                            'loginId': '' + loginId,
                            'oauthProvider': '' + sessionService.getAppuser().oauthProvider,
                            'accountId': '' + sessionService.getAppuser().accountId
                        }
                    });
                };

                profileFactory.updateProfile = function(accessToken, loginId, profile) {
                    return $http({
                        url: urlBase,
                        method: 'PUT',
                        data: profile,
                        headers: {'Authorization': '' + accessToken + '',
                            'loginId': '' + loginId,
                            'oauthProvider': '' + sessionService.getAppuser().oauthProvider,
                            'accountId': '' + sessionService.getAppuser().accountId
                        }
                    });
                };

                return profileFactory;

            }]);