'use strict';
angular.module('ajsjeeApp')
        .factory('loginWrapperFactory', ['$q', '$rootScope', 'ipCookie', 'helloFactory', 'loginFactory', 'sessionService', 'codeManagerFactory', 'sharedDataFactory',
            function($q, $rootScope, ipCookie, helloFactory, loginFactory, sessionService, codeManagerFactory, sharedDataFactory) {

                var loginWrapperFactory = {};

                loginWrapperFactory.getSessionDetails = function(OAuthProvider, url, isRegistered) {

                    var deferred = $q.defer();
                    $rootScope.userDetailsResponse = {};

                    if (!OAuthProvider) {
                        window.location.href = "#/login";
                    }

                    console.log("--------- OAuthProvider -----------");
                    console.log(OAuthProvider);
                    console.log("--------- OAuthProvider -----------");

                    $rootScope.oAuthLoginResponsePromise = helloFactory.getOAuthLoginResponse(OAuthProvider, url, isRegistered);
                    $rootScope.oAuthLoginResponsePromise
                            .then(
                                    function(oAuthLoginResponse) {
                                        var provider;
                                        if (OAuthProvider == 'facebook') {
                                            provider = 'FB';
                                        } else if (OAuthProvider == 'twitter') {
                                            provider = 'TW';
                                        } else if (OAuthProvider == 'google') {
                                            provider = 'GG';
                                        } else if (OAuthProvider == 'linkedin') {
                                            provider = 'LI';
                                        } else if (OAuthProvider == 'yahoo') {
                                            provider = 'YH';
                                        }

                                        var loginDetails = {
                                            accountId: oAuthLoginResponse.accountId,
                                            oauthProvider: provider
                                        };

                                        $rootScope.userDetailsPromise = loginFactory.getUserDetails(loginDetails, oAuthLoginResponse.accessToken);
                                        $rootScope.userDetailsPromise
                                                .then(function(userDetailsResponse) {
                                                    $rootScope.userDetailsResponse = userDetailsResponse;
                                                    if ($rootScope.userDetailsResponse.returnCode == null) {
                                                        sessionService.setReturnCode(2000);
                                                        deferred.resolve(sessionService);
                                                    } else if (codeManagerFactory.isSuccess($rootScope.userDetailsResponse.returnCode)) {
                                                        var birthday = new Date("" + $rootScope.userDetailsResponse.appuser.birthday + "");
                                                        var membershipDate = new Date("" + $rootScope.userDetailsResponse.appuser.membershipDate + "");
                                                        var lastLogin = new Date("" + $rootScope.userDetailsResponse.appuser.lastLogin + "");
                                                        sessionService.setAppuserId($rootScope.userDetailsResponse.appuser.pkAppuserId);
                                                        sessionService.setAccountId(oAuthLoginResponse.accountId);
                                                        sessionService.setOauthProvider(provider);
                                                        sessionService.setFirstName($rootScope.userDetailsResponse.appuser.firstName);
                                                        sessionService.setLastName($rootScope.userDetailsResponse.appuser.lastName);
                                                        sessionService.setAccountEmail($rootScope.userDetailsResponse.appuser.accountEmail);
                                                        sessionService.setBirthday(birthday);
                                                        sessionService.setGender($rootScope.userDetailsResponse.appuser.gender);
                                                        sessionService.setMembershipDate(membershipDate);
                                                        sessionService.setLastLogin(lastLogin);
                                                        sessionService.setAccountStatus($rootScope.userDetailsResponse.appuser.accountStatus);
                                                        sessionService.setNetwork(OAuthProvider);

                                                        var appuser = {
                                                            pkAppuserId: $rootScope.userDetailsResponse.appuser.pkAppuserId,
                                                            accountId: oAuthLoginResponse.accountId,
                                                            oauthProvider: provider,
                                                            firstName: $rootScope.userDetailsResponse.appuser.firstName,
                                                            lastName: $rootScope.userDetailsResponse.appuser.lastName,
                                                            accountEmail: $rootScope.userDetailsResponse.appuser.accountEmail,
                                                            birthday: birthday,
                                                            gender: $rootScope.userDetailsResponse.appuser.gender,
                                                            membershipDate: membershipDate,
                                                            lastLogin: lastLogin,
                                                            accountStatus: $rootScope.userDetailsResponse.appuser.accountStatus
                                                        };
                                                        sessionService.setAppuser(appuser);
                                                        sessionService.setPicture($rootScope.userDetailsResponse.picture);
                                                        sessionService.setProfileId($rootScope.userDetailsResponse.pkProfileId);
                                                        sessionService.setAgentId($rootScope.userDetailsResponse.pkAgentId);
                                                        sessionService.setAccessToken(oAuthLoginResponse.accessToken);
                                                        sessionService.setReturnCode($rootScope.userDetailsResponse.returnCode);
                                                        //sessionService.setReturnCode(2000); // Use this line to test display messages.

                                                        ipCookie('cookieOAuthProvider', OAuthProvider);
                                                        sharedDataFactory.firstName = $rootScope.userDetailsResponse.appuser.firstName;
                                                        sharedDataFactory.loginId = $rootScope.userDetailsResponse.appuser.pkAppuserId;
                                                        sharedDataFactory.profileId = $rootScope.userDetailsResponse.pkProfileId;
                                                        sharedDataFactory.agentId = $rootScope.userDetailsResponse.pkAgentId;
                                                        sharedDataFactory.companyId = $rootScope.userDetailsResponse.pkCompanyId;
//                                                        sharedDataFactory.currentServerDate = $rootScope.userDetailsResponse.currentServerDate;
                                                        deferred.resolve(sessionService);
                                                    } else {
                                                        sessionService.setReturnCode($rootScope.userDetailsResponse.returnCode);
                                                        deferred.resolve(sessionService);
                                                    }
                                                },
                                                        function(err) {
                                                            console.log("ERROR: " + err.toString());
                                                            deferred.reject("error getting data");
                                                        });
                                    },
                                    function(err) {
                                        console.log("ERROR: oAuthLoginResponse error details = " + err.toString());
                                    }
                            );
                    return deferred.promise;

                };
                return loginWrapperFactory;
            }]);
            