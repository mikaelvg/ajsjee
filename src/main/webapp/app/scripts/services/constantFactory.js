'use strict';

angular.module('ajsjeeApp')
        .factory('constantFactory', ['$http', function($http) {

                var urlBase = '/webresources/rest.constant';
                var constantFactory = {};

                constantFactory.reloadContants = function() {
                    return $http({
                        url: urlBase,
                        method: 'POST'
                    });
                };

                return constantFactory;
            }]);