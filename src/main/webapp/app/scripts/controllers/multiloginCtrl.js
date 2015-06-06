'use strict';
angular.module('ajsjeeApp')
        .controller('multiloginCtrl', ['$rootScope', '$scope', '$q', '$route', '$routeParams', '$modal', 'ipCookie', 'helloFactory', 'oauthFactory', 'loginWrapperFactory', 'codeManagerFactory', 'sessionService', 'sharedDataFactory',
            function($rootScope, $scope, $q, $route, $routeParams, $modal, ipCookie, helloFactory, oauthFactory, loginWrapperFactory, codeManagerFactory, sessionService, sharedDataFactory) {

                var loginId = sessionService.getAppuserId();
                var deferred = $q.defer();
                var accessToken;
                var message;
                var popup;
                var url;
                var code = 1;

                if (!loginId) {
                    if ($routeParams.currentoauthprovider
                            && $routeParams.newoauthprovider
                            && !ipCookie('cookieOAuthProvider')) {
                        if ($routeParams.currentoauthprovider == 'facebook' || $routeParams.currentoauthprovider == 'twitter'
                                || $routeParams.currentoauthprovider == 'google' || $routeParams.currentoauthprovider == 'yahoo'
                                || $routeParams.currentoauthprovider == 'linkedin') {
                            if ($routeParams.newoauthprovider == 'facebook' || $routeParams.newoauthprovider == 'twitter'
                                    || $routeParams.newoauthprovider == 'google' || $routeParams.newoauthprovider == 'yahoo'
                                    || $routeParams.newoauthprovider == 'linkedin') {
                                hello.logout($routeParams.currentoauthprovider, {force: true});
                                hello.logout($routeParams.newoauthprovider, {force: true});
                                checkIfAccountExist();
                            } else {
                                $rootScope.urlPage = 'multilogin';
                                toastr.info('Please register or login!');
                                window.location.href = '#!/login';
                            }
                        } else {
                            $rootScope.urlPage = 'multilogin';
                            toastr.info('Please register or login!');
                            window.location.href = '#!/login';
                        }
                    } else if (ipCookie('cookieOAuthProvider')) {
                        $scope.sessionDetailsResponsePromise = loginWrapperFactory.getSessionDetails(ipCookie('cookieOAuthProvider'));
                        $scope.sessionDetailsResponsePromise
                                .then(function(sessionDetailsResponse) {
                                    sessionService = sessionDetailsResponse;
                                    if (codeManagerFactory.isSuccess(sessionService.getReturnCode())) {
                                        loginId = sessionService.getAppuserId();
                                        methodsWrapper();
                                    } else {
                                        $rootScope.urlPage = 'multilogin';
                                        toastr.info('Please register or login!');
                                        window.location.href = '#!/login';
                                    }
                                });
                    } else {
                        $rootScope.urlPage = 'multilogin';
                        toastr.info('Please register or login!');
                        window.location.href = '#!/login';
                    }
                } else {
                    methodsWrapper();
                }

                function methodsWrapper() {
                    accessToken = sessionService.getAccessToken();

                    $scope.oauthProvider = ipCookie('cookieOAuthProvider');
                    getOauthByAppuserId();
                }

                function getOauthByAppuserId() {
                    oauthFactory.getOauthByAppuserId(accessToken, loginId, loginId)
                            .success(function(oAuthResponse) {
                                console.log(oAuthResponse);
                                message = codeManagerFactory.getMessage(oAuthResponse.returnCode);
                                if (codeManagerFactory.isSuccess(oAuthResponse.returnCode)) {
                                    $scope.lstOauth = oAuthResponse.lstOauth;
                                    if ($scope.lstOauth) {
                                        for (var count = 1; count <= $scope.lstOauth.length; count++) {
                                            console.log($scope.lstOauth[count - 1]);
                                            if ($scope.lstOauth[count - 1].oauthProvider == 'FB') {
                                                $scope.facebookAccount = $scope.lstOauth[count - 1];
                                                $scope.hasFacebookAccount = true;
                                            } else if ($scope.lstOauth[count - 1].oauthProvider == 'TW') {
                                                $scope.twitterAccount = $scope.lstOauth[count - 1];
                                                $scope.hasTwitterAccount = true;
                                            } else if ($scope.lstOauth[count - 1].oauthProvider == 'GG') {
                                                $scope.googleAccount = $scope.lstOauth[count - 1];
                                                $scope.hasGoogleAccount = true;
                                            } else if ($scope.lstOauth[count - 1].oauthProvider == 'LI') {
                                                $scope.linkedinAccount = $scope.lstOauth[count - 1];
                                                $scope.hasLinkedinAccount = true;
                                            } else if ($scope.lstOauth[count - 1].oauthProvider == 'YH') {
                                                $scope.yahooAccount = $scope.lstOauth[count - 1];
                                                $scope.hasYahooAccount = true;
                                            }
                                            $scope.doneLoading = true;
                                        }
                                    }
                                } else {

                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function removeOauth(oauthProvider) {
                    if (oauthProvider == 'facebook') {
                        $scope.oauthId = $scope.facebookAccount.pkOauthId;
                    } else if (oauthProvider == 'twitter') {
                        $scope.oauthId = $scope.twitterAccount.pkOauthId;
                    } else if (oauthProvider == 'google') {
                        $scope.oauthId = $scope.googleAccount.pkOauthId;
                    } else if (oauthProvider == 'yahoo') {
                        $scope.oauthId = $scope.yahooAccount.pkOauthId;
                    } else if (oauthProvider == 'linkedin') {
                        $scope.oauthId = $scope.linkedinAccount.pkOauthId;
                    }
                    oauthFactory.removeOauth(accessToken, loginId, $scope.oauthId)
                            .success(function(ReturncodeResponse) {
                                message = codeManagerFactory.getMessage(ReturncodeResponse.returnCode);
                                if (codeManagerFactory.isSuccess(ReturncodeResponse.returnCode)) {
                                    if (oauthProvider == 'facebook') {
                                        $scope.hasFacebookAccount = false;
                                    } else if (oauthProvider == 'twitter') {
                                        $scope.hasTwitterAccount = false;
                                    } else if (oauthProvider == 'google') {
                                        $scope.hasGoogleAccount = false;
                                    } else if (oauthProvider == 'yahoo') {
                                        $scope.hasYahooAccount = false;
                                    } else if (oauthProvider == 'linkedin') {
                                        $scope.hasLinkedinAccount = false;
                                    }
                                    getOauthByAppuserId();
                                    $scope.removeAccountButton = false;
                                    toastr.info(message);
                                } else {
                                    toastr.error(message);
                                }
                            })
                            .error(function() {
                                $scope.removeAccountButton = false;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function confirmLogout(oauthProvider) {
                    if (!$scope.confirmLogoutButton) {
                        $scope.confirmLogoutButton = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/confirmCreateOauth.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function(agree) {
                            if (agree) {
//                                getToken(oauthProvider);
                                logout(oauthProvider);
                                $scope.doneLoading = false;
                                $scope.confirmLogoutButton = false;
                            }
                        }, function() {
                            $scope.doneLoading = true;
                            $scope.confirmLogoutButton = false;
                            console.log("Cancelled deletion");
                        });
                    }
                }

                function getToken(oauthProvider) {
                    oauthFactory.getToken(accessToken, loginId, code)
                            .success(function(oAuthResponse) {
                                message = codeManagerFactory.getMessage(oAuthResponse.returnCode);
                                if (codeManagerFactory.isSuccess(oAuthResponse.returnCode)) {
                                    logout(oauthProvider, oAuthResponse.token);
                                } else {
                                    $route.reload();
                                    toastr.error('Please email support. \nError details : ' + message);
                                }
                            })
                            .error(function() {
                                $route.reload();
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function logout(oauthProvider) {
                    $scope.oauthProvider = '';
                    sessionService.setAppuserId();
                    sessionService.setAgentId();
                    sessionService.setAccessToken();
                    sharedDataFactory.firstName = '';
                    sharedDataFactory.loginId = '';
                    sharedDataFactory.agentTab = '';
                    sharedDataFactory.jobpostTab = '';
                    sharedDataFactory.serviceTab = '';
                    sharedDataFactory.feedbackTab = '';
                    sharedDataFactory.cfgServiceId = '';
                    sharedDataFactory.fromUrl = '';
                    sharedDataFactory.oAuthProvider = '';
                    sharedDataFactory.notRegistered = '';
                    sharedDataFactory.postad = '';
                    sharedDataFactory.accountId = sessionService.getAccountId();
                    var cookieOAuthProvider = ipCookie('cookieOAuthProvider');
                    ipCookie.remove('cookieOAuthProvider');
                    deferred.promise
                            .then(function() {
                                hello.logout(cookieOAuthProvider, {force: true});
                                hello.logout(oauthProvider, {force: true});
                                if (cookieOAuthProvider == 'google') {
                                    url = 'https://www.google.com/accounts/Logout';
                                    redirectPageDelay();
                                } else if (cookieOAuthProvider == 'yahoo') {
                                    url = 'https://login.yahoo.com/config/login?.src=fpctx&logout=1';
                                    redirectPageDelay();
                                }
                            })
                            .then(function() {
                                setTimeout(function() {
                                    window.location.href = '#!/currentlylogin/' + cookieOAuthProvider
                                            + '/newloginaccount/' + oauthProvider;
                                }, 2000);
                            });
                    deferred.resolve();
                }

                function redirectPageDelay() {
                    popup = window.open(url, '', 'menubar=no,resizable=no,width=10,height=10');
                    setTimeout(function() {
                        popup.close();
                    }, 1500);
                }

                function checkIfAccountExist() {
                    $scope.sessionDetailsResponsePromise = loginWrapperFactory.getSessionDetails($routeParams.currentoauthprovider, 'multilogin');
                    $scope.sessionDetailsResponsePromise
                            .then(function(sessionService) {
                                if (codeManagerFactory.isSuccess(sessionService.getReturnCode())) {
                                    setTimeout(function() {
                                        getNewLoginAccountDetails();
                                    }, 500);
                                } else {
                                    toastr.error('You are not currently registered.');
                                    $rootScope.urlPage = 'multilogin';
                                    window.location.href = '#!/login';
                                }
                            });
                }

                function getNewLoginAccountDetails() {
                    $rootScope.oAuthLoginResponsePromise = helloFactory.getOAuthLoginResponse($routeParams.newoauthprovider, 'multilogin', 'addNewLoginAccount');
                    $rootScope.oAuthLoginResponsePromise
                            .then(function(oauthResponse) {
                                createOauth(oauthResponse);
                            });
                }

                function createOauth(oauthResponse) {
                    var oauthProvider;
                    if (oauthResponse.OAuthProvider == 'facebook') {
                        oauthProvider = 'FB';
                    } else if (oauthResponse.OAuthProvider == 'twitter') {
                        oauthProvider = 'TW';
                    } else if (oauthResponse.OAuthProvider == 'google') {
                        oauthProvider = 'GG';
                    } else if (oauthResponse.OAuthProvider == 'linkedin') {
                        oauthProvider = 'LI';
                    } else if (oauthResponse.OAuthProvider == 'yahoo') {
                        oauthProvider = 'YH';
                    }

                    var oauthData = {
                        fkAppuserId: sessionService.getAppuser(),
                        oauthProvider: oauthProvider,
                        accountId: oauthResponse.accountId
                    };

                    oauthFactory.createOauth(oauthResponse.accessToken, sessionService.getAppuser().pkAppuserId, oauthData)
                            .success(function(CreateUpdateResponse) {
                                message = codeManagerFactory.getMessage(CreateUpdateResponse.returnCode);
                                if (codeManagerFactory.isSuccess(CreateUpdateResponse.returnCode)) {
                                    toastr.info(message);
                                } else {
                                    toastr.error(message);
                                }
                                redirectToMultilogin();
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                                redirectToMultilogin();
                            });
                }

                function redirectToMultilogin() {
                    deferred.promise
                            .then(function() {
                                hello.logout($routeParams.newoauthprovider, {force: true});
                                if ($routeParams.newoauthprovider == 'google') {
                                    url = 'https://www.google.com/accounts/Logout';
                                    redirectPageDelay();
                                } else if ($routeParams.newoauthprovider == 'yahoo') {
                                    url = 'https://login.yahoo.com/config/login?.src=fpctx&logout=1';
                                    redirectPageDelay();
                                }
                            })
                            .then(function() {
                                setTimeout(function() {
                                    $scope.oauthProvider = ipCookie('cookieOAuthProvider');
                                    window.location.href = '#!/multilogin';
                                }, 1500);
                            });
                    deferred.resolve();
                }

                $scope.createOauth = function(oauthProvider) {
                    confirmLogout(oauthProvider);
                };

                $scope.removeAccount = function(oauthProvider) {
                    if (!$scope.removeAccountButton) {
                        $scope.removeAccountButton = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/confirmDelete.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function() {
                            removeOauth(oauthProvider);
                        }, function() {
                            $scope.removeAccountButton = false;
                            console.log("Cancelled deletion");
                        });
                    }
                };
            }]);