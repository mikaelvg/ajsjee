'use strict';

angular.module('ajsjeeApp')
    .factory('accountFactory', ['$http', function($http) {
            
            var urlBase = '/webresources/rest.account';
            var accountFactory = {};
            
            accountFactory.getAccountDetailsByAppuserId = function(accessToken, loginId, appuserId) {
                return $http({
                    url: urlBase + '/appuser/' + appuserId,
                    method: 'GET',
                    headers: {'Authorization': '' + accessToken + '','loginId': '' + loginId}
                });
            };
            return accountFactory;

        }]);