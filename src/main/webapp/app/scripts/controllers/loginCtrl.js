'use strict';
angular.module('ajsjeeApp')
        .controller('loginCtrl', ['$rootScope', '$scope', '$routeParams', '$filter', 'codeManagerFactory', 'ipCookie', 'helloFactory', 'oauthFactory', 'loginWrapperFactory', 'sharedDataFactory',
            function($rootScope, $scope, $routeParams, $filter, codeManagerFactory, ipCookie, helloFactory, oauthFactory, loginWrapperFactory, sharedDataFactory) {

                $scope.oAuthUser = {};
                var viewportWidth = $(window).width();
                var noOfDays;
                var message;
                loadLookups();

                $(window).resize(function() {
                    viewportWidth = $(window).width();
                });

                $scope.$on('$locationChangeStart', function(event, nextLocation, currentLocation) {
                    if ($routeParams.registermethod && $scope.registrationInProcess) {
                        var answer = confirm("You're not yet done! \n\n Are you sure you want to leave this page?");
                        if (!answer) {
                            event.preventDefault();
                        } else {
                            hello.logout($routeParams.registermethod, {force: true});
                        }
                    }
                });

                if (sharedDataFactory.popupWasBlocked) {
                    sharedDataFactory.popupWasBlocked = '';
                    $scope.popupWasBlocked = true;
                }

                if (sharedDataFactory.loginId) {
                    window.location.href = '#!/home';
                } else if (!$routeParams.registermethod) {
                    hello.logout(ipCookie('cookieOAuthProvider', {force: true}));
                    setTimeout(function() {
                        ipCookie.remove('cookieOAuthProvider');
                    }, 1000);
                    console.log("Regular Login");
                    $scope.isNotReadyForSignup = true;
                    $scope.notRegistered = true;
                    $scope.notLogin = true;
                    $scope.facebookShow = true;
                    $scope.twitterShow = true;
                    $scope.googleShow = true;
                    $scope.linkedinShow = true;
                    $scope.yahooShow = true;
                    $('html, body').animate({scrollTop: 0}, 1000);
                } else if ($routeParams.registermethod) {
                    var registerMethod = $routeParams.registermethod;
                    if (registerMethod == 'facebook' || registerMethod == 'twitter'
                            || registerMethod == 'google' || registerMethod == 'yahoo'
                            || registerMethod == 'linkedin') {
                        $scope.isNotReadyForSignup = true;
                        hello.logout(ipCookie('cookieOAuthProvider', {force: true}));
                        ipCookie.remove('cookieOAuthProvider');
                        if (sharedDataFactory.notRegistered) {
                            loginToOAuthProvider($routeParams.registermethod, sharedDataFactory.notRegistered);
                            sharedDataFactory.notRegistered = '';
                        } else {
                            checkIfAccountExist($routeParams.registermethod);
                        }
                    } else {
                        toastr.error('Invalid parameter');
                        window.location.href = '#!/login';
                    }
                }

                function checkIfAccountExist(OAuthProvider, isForRegistration) {
                    $scope.sessionDetailsResponsePromise = loginWrapperFactory.getSessionDetails(OAuthProvider, 'login', isForRegistration);
                    $scope.sessionDetailsResponsePromise
                            .then(function(sessionService) {
                                if (codeManagerFactory.isSuccess(sessionService.getReturnCode())) {
                                    if (!isForRegistration) {
                                        toastr.info('Login successful');
                                        if ($rootScope.isPremiumJobpostSelected) {
                                            window.location.href = '#!/createjobpost/premium';
                                        } else if (sharedDataFactory.postad) {
                                            var postad = sharedDataFactory.postad.split('/');
                                            if (postad[0] == 'createservice' && sessionService.getProfileId()) {
                                                window.location.href = '#!/' + sharedDataFactory.postad;
                                            } else if (postad[0] == 'createservice' && !sessionService.getProfileId()) {
                                                window.location.href = '#!/createprofile/service';
                                            } else if (postad[0] == 'createjobpost') {
                                                var postad = sharedDataFactory.postad;
                                                sharedDataFactory.postad = '';
                                                window.location.href = '#!/' + postad;
                                                sharedDataFactory.postad = '';
                                            } else {
                                                var postad = sharedDataFactory.postad;
                                                sharedDataFactory.postad = '';
                                                if (postad == 'providing' && !sessionService.getProfileId()) {
                                                    window.location.href = '#!/createprofile/service';
                                                } else {
                                                    if (postad == 'looking') {
                                                        setTimeout(function() {
                                                            toastr.info("Select a category then the service you're looking.");
                                                        }, 2000);
                                                    } else if (postad == 'providing') {
                                                        setTimeout(function() {
                                                            toastr.info("Select a category then the service you would like to provide.");
                                                        }, 2000);
                                                    }
                                                    window.location.href = '#!/postad';
                                                }
                                            }
                                        } else {
                                            if ($rootScope.urlPage) {
                                                var url = $rootScope.urlPage;
                                                $rootScope.urlPage = '';
                                                if (url == 'registercompany' && sharedDataFactory.profileId) {
                                                    window.location.href = '#!/' + url;
                                                } else if (url == 'registercompany' && !sharedDataFactory.profileId) {
                                                    window.location.href = '#!/createprofile/company';
                                                } else {
                                                    window.location.href = '#!/' + url;
                                                }
                                            } else if ($rootScope.agent) {
                                                $rootScope.agent = '';
                                                if (sharedDataFactory.profileId) {
                                                    sharedDataFactory.agentTab = true;
                                                    window.location.href = '#!/mydashboard';
                                                } else {
                                                    window.location.href = '#!/createprofile/agent';
                                                }
                                            } else {
                                                window.location.href = '#';
                                            }
                                        }
                                    } else if ($scope.registrationSuccessful) {
                                        if ($rootScope.isPremiumJobpostSelected) {
                                            window.location.href = '#!/createjobpost/premium';
                                        } else if (sharedDataFactory.postad) {
                                            var postad = sharedDataFactory.postad.split('/');
                                            if (postad[0] == 'createservice') {
                                                window.location.href = '#!/createprofile/service';
                                            } else if (postad[0] == 'createjobpost') {
                                                var postad = sharedDataFactory.postad;
                                                sharedDataFactory.postad = '';
                                                window.location.href = '#!/' + postad;
                                            } else {
                                                var postad = sharedDataFactory.postad;
                                                sharedDataFactory.postad = '';
                                                if (postad == 'providing' && !sessionService.getProfileId()) {
                                                    window.location.href = '#!/createprofile/service';
                                                } else {
                                                    if (postad == 'looking') {
                                                        setTimeout(function() {
                                                            toastr.info("Select a category then the service you're looking.");
                                                        }, 2000);
                                                    } else if (postad == 'providing') {
                                                        setTimeout(function() {
                                                            toastr.info("Select a category then the service you would like to provide.");
                                                        }, 2000);
                                                    }
                                                    window.location.href = '#!/postad';
                                                }
                                            }
                                        } else {
                                            if ($rootScope.urlPage) {
                                                var url = $rootScope.urlPage;
                                                $rootScope.urlPage = '';
                                                if (url == 'registerCompany' && sharedDataFactory.profileId) {
                                                    window.location.href = '#!/' + url;
                                                } else if (url == 'registerCompany' && !sharedDataFactory.profileId) {
                                                    window.location.href = '#!/createprofile/company';
                                                } else {
                                                    window.location.href = '#!/' + url;
                                                }
                                            } else if ($rootScope.agent) {
                                                $rootScope.agent = '';
                                                if (sessionService.getProfileId()) {
                                                    sharedDataFactory.agentTab = true;
                                                    window.location.href = '#!/mydashboard';
                                                } else {
                                                    window.location.href = '#!/createprofile/agent';
                                                }
                                            } else {
                                                window.location.href = '#';
                                            }
                                        }
                                    }
                                } else {
                                    if ($routeParams.registermethod == OAuthProvider) {
                                        loginToOAuthProvider(OAuthProvider, 'notRegistered');
                                        $scope.notRegistered = true;
                                    } else {
                                        sharedDataFactory.notRegistered = 'notRegistered';
                                        window.location.href = '#!/register/' + OAuthProvider;
                                    }
                                }
                            });
                }

                function loginToOAuthProvider(OAuthProvider, isRegistered) {
                    $rootScope.oAuthLoginResponsePromise = helloFactory.getOAuthLoginResponse(OAuthProvider, 'register', isRegistered);
                    $rootScope.oAuthLoginResponsePromise
                            .then(function(oAuthLoginResponse) {
                                $scope.oAuthUser = oAuthLoginResponse;
                                $scope.oAuthProvider = OAuthProvider;
                                if (oAuthLoginResponse.birthday) {
                                    var splitedBirthDate = oAuthLoginResponse.birthday.split('/');
                                    $scope.birthYear = parseInt(splitedBirthDate[2]);
                                    $scope.birthMonth = parseInt(splitedBirthDate[0]);
                                    $scope.birthDay = parseInt(splitedBirthDate[1]);
                                }
                                $scope.notRegistered = true;
                                $scope.isNotReadyForSignup = false;
                                $scope.registrationInProcess = true;
                                scrollTo('#firstName');

                                if (!oAuthLoginResponse.gender) {
                                    $scope.oAuthUser.gender = 'male';
                                }
                                setDays($scope.birthMonth);
                                socialButtonDelay(OAuthProvider);
                            });
                }

                function socialButtonDelay(OAuthProvider) {
                    $scope.socialShow = true;
                    $('.login-page .social-icon').css('cursor', 'default');
                    if (OAuthProvider == 'facebook') {
                        $scope.facebook = 'btn-active-social';
                        $scope.facebookOffset = 'facebookOffset';

                        setTimeout(function() {
                            $scope.twitter = '';
                            $scope.google = '';
                            $scope.linkedin = '';
                            $scope.yahoo = '';
                        }, 1000);

                        $scope.facebookDisabled = true;
                        $scope.twitterDisabled = false;
                        $scope.googleDisabled = false;
                        $scope.linkedinDisabled = false;
                        $scope.yahooDisabled = false;

                        $scope.facebookShow = true;
                        $scope.twitterShow = false;
                        $scope.googleShow = false;
                        $scope.linkedinShow = false;
                        $scope.yahooShow = false;
                    } else if (OAuthProvider == 'twitter') {
                        $scope.facebook = '';
                        $scope.twitter = 'btn-active-social';
                        $scope.twitterOffset = 'col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-5';
                        $scope.google = '';
                        $scope.linkedin = '';
                        $scope.yahoo = '';
                        $scope.facebookDisabled = false;
                        $scope.twitterDisabled = true;
                        $scope.googleDisabled = false;
                        $scope.linkedinDisabled = false;
                        $scope.yahooDisabled = false;

                        $scope.facebookShow = false;
                        $scope.twitterShow = true;
                        $scope.googleShow = false;
                        $scope.linkedinShow = false;
                        $scope.yahooShow = false;
                    } else if (OAuthProvider == 'google') {
                        $scope.facebook = '';
                        $scope.twitter = '';
                        $scope.google = 'btn-active-social';
                        $scope.googleOffset = 'col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-5';
                        $scope.linkedin = '';
                        $scope.yahoo = '';
                        $scope.facebookDisabled = false;
                        $scope.twitterDisabled = false;
                        $scope.googleDisabled = true;
                        $scope.linkedinDisabled = false;
                        $scope.yahooDisabled = false;

                        $scope.facebookShow = false;
                        $scope.twitterShow = false;
                        $scope.googleShow = true;
                        $scope.linkedinShow = false;
                        $scope.yahooShow = false;
                    } else if (OAuthProvider == 'linkedin') {
                        $scope.facebook = '';
                        $scope.twitter = '';
                        $scope.google = '';
                        $scope.yahoo = '';
                        $scope.linkedin = 'btn-active-social';
                        $scope.linkedinOffset = 'col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-5';
                        $scope.facebookDisabled = false;
                        $scope.twitterDisabled = false;
                        $scope.googleDisabled = false;
                        $scope.linkedinDisabled = true;
                        $scope.yahooDisabled = false;

                        $scope.facebookShow = false;
                        $scope.twitterShow = false;
                        $scope.googleShow = false;
                        $scope.linkedinShow = true;
                        $scope.yahooShow = false;
                    } else if (OAuthProvider == 'yahoo') {
                        $scope.facebook = '';
                        $scope.twitter = '';
                        $scope.google = '';
                        $scope.linkedin = '';
                        $scope.yahoo = 'btn-active-yahoo';
                        $scope.yahooOffset = 'col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-5';
                        $scope.facebookDisabled = false;
                        $scope.twitterDisabled = false;
                        $scope.googleDisabled = false;
                        $scope.linkedinDisabled = false;
                        $scope.yahooDisabled = true;

                        $scope.facebookShow = false;
                        $scope.twitterShow = false;
                        $scope.googleShow = false;
                        $scope.linkedinShow = false;
                        $scope.yahooShow = true;
                    }
                }

                function insertOauth() {
                    if (!$scope.signUpButtonClicked) {
                        $scope.signUpButtonClicked = true;
                        var oauthProvider;
                        if ($scope.oAuthProvider == 'facebook') {
                            oauthProvider = 'FB';
                        } else if ($scope.oAuthProvider == 'twitter') {
                            oauthProvider = 'TW';
                        } else if ($scope.oAuthProvider == 'google') {
                            oauthProvider = 'GG';
                        } else if ($scope.oAuthProvider == 'linkedin') {
                            oauthProvider = 'LI';
                        } else if ($scope.oAuthProvider == 'yahoo') {
                            oauthProvider = 'YH';
                        }

                        var appuserData = {
                            firstName: $scope.oAuthUser.firstName,
                            lastName: $scope.oAuthUser.lastName,
                            accountEmail: $scope.oAuthUser.email,
                            birthday: $scope.birthMonth + '/' + $scope.birthDay + '/' + $scope.birthYear,
                            gender: $scope.oAuthUser.gender,
                            membershipDate: new Date(),
                            lastLogin: new Date()
                        };

                        var oauthData = {
                            fkAppuserId: appuserData,
                            oauthProvider: oauthProvider,
                            accountId: $scope.oAuthUser.accountId
                        };

                        console.log($scope.oAuthUser.accessToken);
                        console.log(appuserData);

                        // Change this to call oauthFactory
                        oauthFactory.createNewAccount($scope.oAuthUser.accessToken, oauthData)
                                .success(function(createUpdateResponse) {
                                    console.log(createUpdateResponse);
                                    message = codeManagerFactory.getMessage(createUpdateResponse.returnCode);
                                    if (codeManagerFactory.isSuccess(createUpdateResponse.returnCode)) {
                                        toastr.info('Registration Successful.');
                                        $scope.notRegistered = false;
                                        $scope.isNotReadyForSignup = true;
                                        $scope.registrationInProcess = false;
                                        $scope.registrationSuccessful = true;
                                        checkIfAccountExist($scope.oAuthProvider, 'registered');
                                    } else {
                                        $scope.signUpBtn = false;
                                        $scope.signUpButtonClicked = false;
                                        if (message == 'Account email already used!') {
                                            scrollTo('#email');
                                        }
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    $scope.signUpBtn = false;
                                    $scope.signUpButtonClicked = false;
                                    toastr.error('Registration Unsuccessful.');
                                });
                    }
                }

                function setDays(id) {
                    var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    if (!id) {
                        id = 1;
                    }
                    noOfDays = monthDays[id - 1];
                    loadLookups();
                }

                function scrollTo(targetId) {
                    var topOffset;
                    var destination;
                    if (viewportWidth > 991) {
                        topOffset = 146;
                    } else if (viewportWidth < 992) {
                        topOffset = 80;
                    }
                    setTimeout(function() {
                        destination = $(targetId).offset().top - topOffset;
                        $('html, body').animate({scrollTop: destination}, 300);
                        setTimeout(function() {
                            $(targetId).focus();
                        }, 300);
                    }, 500);
                }

                function loadLookups() {
                    if (sharedDataFactory.currentServerDate) {
                        $scope.dateYear = $filter('date')(sharedDataFactory.currentServerDate, 'yyyy');
                        console.log('Current server date : ' + sharedDataFactory.currentServerDate);
                    } else {
                        $scope.dateYear = new Date().getFullYear();
                    }
                    $scope.yearStart = $scope.dateYear - 100;

                    var yearRange = [];
                    for (var intyear = $scope.dateYear; intyear >= $scope.yearStart; intyear--) {
                        yearRange.push(intyear);
                    }
                    $scope.years = yearRange;

                    var dayRange = [];
                    for (var intday = 1; intday <= noOfDays; intday++) {
                        dayRange.push(intday);
                    }
                    $scope.days = dayRange;
                    $scope.months = sharedDataFactory.months;
                }

                $scope.loginRegister = function(OAuthProvider) {
                    if (!$scope.yahoo && !$scope.twitter
                            && !$scope.google && !$scope.yahoo
                            && !$scope.linkedin) {
                        hello.logout(OAuthProvider, {force: true});
                        checkIfAccountExist(OAuthProvider);
                    }
                };

                $scope.registerUser = function() {
                    if (!$scope.birthMonth || $('#birthMonth').val() == '') {
                        toastr.info('Please fill up birthday!');
                        scrollTo('#birthMonth');
                    } else if (!$scope.birthDay || $('#birthDay').val() == '') {
                        toastr.info('Please fill up birthday!');
                        scrollTo('#birthDay');
                    } else if (!$scope.birthYear || $('#birthYear').val() == '') {
                        toastr.info('Please fill up birthday!');
                        scrollTo('#birthYear');
                    } else {
                        $scope.signUpBtn = true;
                        insertOauth();
                    }
                };

                $scope.setDayRange = function(id) {
                    setDays(id);
                };

                $scope.carousel = function(direction) {
                    $('#ajsjeeCarousel').carousel(direction);
                };
            }]);