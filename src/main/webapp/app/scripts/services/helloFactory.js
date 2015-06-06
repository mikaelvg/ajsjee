'use strict';
angular.module('ajsjeeApp')
        .factory('helloFactory', ['$rootScope', '$q', 'ipCookie', 'sharedDataFactory', function($rootScope, $q, ipCookie, sharedDataFactory) {

                var helloFactory = {};
                var oauthScopes;
                var popup;
                var image = new Image();
                var canvas = document.createElement("canvas");
                var canvasContext = canvas.getContext("2d");
                image.crossOrigin = 'anonymous';
                var cookieOAuthProvider = ipCookie('cookieOAuthProvider');
                var accessDetails = {};
                var oAuthLoginResponse = {
                    OAuthProvider: null,
                    accountId: null,
                    firstName: null,
                    lastName: null,
                    gender: null,
                    birthday: null,
                    accessToken: null,
                    expiry: null
                };

                helloFactory.getOAuthLoginResponse = function(OAuthProvider, url, isRegistered) {

                    var deferred = $q.defer();
                    if (OAuthProvider == 'facebook') {
//                        oauthScopes = 'email,friends,user_birthday';
                        oauthScopes = 'email,user_birthday';
                    } else if (OAuthProvider == 'yahoo') {
//                        oauthScopes = 'email,friends,birthdate'; 
                        oauthScopes = 'email,birthdate';
                    } else {
//                        oauthScopes = 'email,friends,birthday';
                        oauthScopes = 'email,birthday';
                    }

                    if (cookieOAuthProvider && url != 'register' && url != 'login' && url != 'multilogin') {
                        if (cookieOAuthProvider != OAuthProvider) {
                            hello.login(OAuthProvider, {scope: '' + oauthScopes},
                            function() {
                                helloApi();
                            }).then(function() {
                                console.log('Success connecting to hello.login');
                            }, function(e) {
                                console.log('Error connecting to hello.login');
                                console.log(e);
                                hello.logout(OAuthProvider, {force: true});
                                if (e.error.code == 'blocked') {
                                    toastr.error(e.error.message + '.');
                                    sharedDataFactory.popupWasBlocked = true;
                                } else if (e.error.code == 'cancelled') {
                                    toastr.error(e.error.message + '.');
                                    window.location.href = '#/login';
                                }
                            });
                        } else {
                            helloApi();
                        }
                    } else if (isRegistered && url != 'multilogin') {
                        helloApi();
                    } else {
                        hello.login(OAuthProvider, {scope: '' + oauthScopes},
                        function() {
                            helloApi();
                        }).then(function() {
                            console.log('Success connecting to hello.login');
                        }, function(e) {
                            console.log('Error connecting to hello.login');
                            console.log(e);
                            hello.logout(OAuthProvider, {force: true});
                            if (url == 'quickRegister' && e.error.code == 'cancelled') {
                                console.log('quickRegister | cancelled');
                            } else if (e.error.code == 'blocked') {
                                toastr.error(e.error.message + '.');
                                sharedDataFactory.popupWasBlocked = true;
                            } else if (e.error.code == 'cancelled') {
                                toastr.error(e.error.message + '.');
                                window.location.href = '#/login';
                            }
                        });
                    }

                    function helloApi() {
                        console.log("hello api");
                        hello(OAuthProvider).api("me")
                                .then(function(userDetails) {
                                    console.log("hello api success");
                                    console.log(userDetails);
                                    if (!isRegistered && url == 'multilogin'
                                            && sharedDataFactory.accountId != userDetails.id) {
                                        hello.logout(OAuthProvider, {force: true});
                                        if (cookieOAuthProvider == 'google') {
                                            url = 'https://www.google.com/accounts/Logout';
                                            popup = window.open(url, '', 'menubar=no,resizable=no,width=10,height=10');
                                            setTimeout(function() {
                                                popup.close();
                                            }, 1500);
                                        } else if (cookieOAuthProvider == 'yahoo') {
                                            url = 'https://login.yahoo.com/config/login?.src=fpctx&logout=1';
                                            popup = window.open(url, '', 'menubar=no,resizable=no,width=10,height=10');
                                            setTimeout(function() {
                                                popup.close();
                                            }, 1500);
                                        }
                                        setTimeout(function() {
                                            window.location.href = '#/login';
                                        }, 1500);
                                        toastr.error('Ops! You have entered wrong or invalid account!');
                                    } else {
                                        accessDetails = hello(OAuthProvider).getAuthResponse();
                                        oAuthLoginResponse.OAuthProvider = OAuthProvider;
                                        oAuthLoginResponse.accountId = userDetails.id;
                                        oAuthLoginResponse.firstName = userDetails.first_name;
                                        oAuthLoginResponse.gender = userDetails.gender;
                                        oAuthLoginResponse.accessToken = accessDetails.access_token;
                                        oAuthLoginResponse.expiry = accessDetails.expires;
                                        switch (OAuthProvider) {
                                            case 'facebook':
                                                image.onload = function() {
                                                    canvas.width = image.width;
                                                    canvas.height = image.height;
                                                    canvasContext.drawImage(image, 0, 0, image.width, image.height);
                                                    $rootScope.$apply(function() {
                                                        sharedDataFactory.picture = canvas.toDataURL();
                                                        console.log(sharedDataFactory.picture);
                                                    });
                                                };
                                                image.src = userDetails.thumbnail + '?type=large';
                                                break;
//                                            case 'twitter':
//                                                sharedDataFactory.picture = userDetails.thumbnail + '?type=large';
//                                                break;
                                            case 'google':
                                                if (!userDetails.image.isDefault) {
                                                    var splittedImageUrl = userDetails.image.url.split('?');
                                                    image.onload = function() {
                                                        canvas.width = image.width;
                                                        canvas.height = image.height;
                                                        canvasContext.drawImage(image, 0, 0, image.width, image.height);
                                                        $rootScope.$apply(function() {
                                                            sharedDataFactory.picture = canvas.toDataURL();
                                                            console.log(sharedDataFactory.picture);
                                                        });
                                                    };
                                                    image.src = splittedImageUrl[0] + '?sz=200';
                                                }
                                                break;
//                                            case 'yahoo':
//                                                sharedDataFactory.picture = userDetails.thumbnail;
//                                                break;
//                                            case 'linkedin':
//                                                sharedDataFactory.picture = userDetails.thumbnail;
//                                                break;
                                            default:
                                                sharedDataFactory.picture = '';
                                        }
                                        if (OAuthProvider == 'yahoo') {
                                            oAuthLoginResponse.lastName = userDetails.familyName;
                                        } else {
                                            oAuthLoginResponse.lastName = userDetails.last_name;
                                        }
                                        if (OAuthProvider == 'linkedin') {
                                            if (userDetails.dateOfBirth) {
                                                var day = userDetails.dateOfBirth.day;
                                                var month = userDetails.dateOfBirth.month;
                                                var year = userDetails.dateOfBirth.year;
                                                oAuthLoginResponse.birthday = month + "/" + day + "/" + year;
                                            }
                                            oAuthLoginResponse.email = userDetails.emailAddress;
                                        } else {
                                            oAuthLoginResponse.email = userDetails.email;
                                            oAuthLoginResponse.birthday = userDetails.birthday;
                                        }
                                        console.log("---------- oAuthLoginResponse ---------- ");
                                        console.log(oAuthLoginResponse);
                                        console.log(JSON.stringify(oAuthLoginResponse));
                                        console.log("---------- oAuthLoginResponse ---------- ");
                                        deferred.resolve(oAuthLoginResponse);
                                    }
                                }, function(e) {
                                    console.log('Not registered | ' + url);
                                    console.log('Not registered Response | ' + JSON.stringify(e));
                                    if (url == 'multilogin' && isRegistered == 'addNewLoginAccount') {
                                        toastr.error('Error connecting to ' + OAuthProvider + '.');
                                        window.location.href = '#/multilogin';
                                    } else if (!url || url == 'multilogin' || url == 'login') {
                                        if (url == 'multilogin') {
                                            $rootScope.urlPage = url;
                                        }
                                        sharedDataFactory.firstName = '';
                                        toastr.error('Error connecting to ' + OAuthProvider + '.');
                                        window.location.href = '#/login';
                                    } else {

                                    }
                                });
                    }
                    return deferred.promise;
                };
                return helloFactory;
            }]);