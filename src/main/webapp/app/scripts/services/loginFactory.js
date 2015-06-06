'use strict';
angular.module('ajsjeeApp')
        .factory('loginFactory', ['$http', '$q', 'sharedDataFactory',
            function($http, $q, sharedDataFactory) {

                var urlBase = '/webresources/rest.login';
                var loginFactory = {};

                loginFactory.getUserDetails = function(loginDetails, accessToken) {

                    var deferred = $q.defer();
                    $http.post(urlBase, loginDetails, {
                        headers: {'Authorization': '' + accessToken + ''}})
                            .success(
                                    function(data) {
                                        console.log("Success connecting to rest.login return code = " + data.returnCode);
                                        console.log('Current server date : ' + data.currentServerDate);
                                        sharedDataFactory.currentServerDate = data.currentServerDate;
                                        deferred.resolve(data);
                                    })
                            .error(
                                    function(error) {
                                        console.log("ERROR: Error connecting to rest.login! \n\n" + error.toString() + "\n");
                                        deferred.resolve(error.toString());
                                    });
                    return deferred.promise;
                };
                return loginFactory;
            }]);
