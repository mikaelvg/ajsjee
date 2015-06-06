'use strict';

angular.module('ajsjeeApp')
        .controller('homeCtrl', ['$rootScope', '$scope', 'accountFactory', 'jobpostFactory', 'sessionService', 'codeManagerFactory', 'loginWrapperFactory', 'ipCookie', 'sharedDataFactory',
            function($rootScope, $scope, accountFactory, jobpostFactory, sessionService, codeManagerFactory, loginWrapperFactory, ipCookie, sharedDataFactory) {

                var loginId = sessionService.getAppuserId();
                var accessToken = sessionService.getAccessToken();
                var message;

                // slideshow
                $("#slideshow > div:gt(0)").hide();
                setInterval(function() {
                    $('#slideshow > div:first')
                            .fadeOut(500)
                            .next()
                            .fadeIn(500)
                            .end()
                            .appendTo('#slideshow');
                }, 5000);

                if (loginId) {
                    $scope.isLogin = true;
                    methodsWrapper();
                } else {
                    if (ipCookie('cookieOAuthProvider')) {
                        $scope.sessionDetailsResponsePromise = loginWrapperFactory.getSessionDetails(ipCookie('cookieOAuthProvider'), 'home');
                        $scope.sessionDetailsResponsePromise
                                .then(function(sessionDetailsResponse) {
                                    sessionService = sessionDetailsResponse;
                                    if (codeManagerFactory.isSuccess(sessionService.getReturnCode())) {
                                        loginId = sessionService.getAppuserId();
                                        $scope.isLogin = true;
                                        methodsWrapper();
                                    } else {
                                        message = codeManagerFactory.getMessage(sessionService.getReturnCode());
                                        hello.logout(ipCookie('cookieOAuthProvider'), {force: true});
                                        ipCookie.remove('cookieOAuthProvider');
                                    }
                                });
                    } else {
                        $scope.isLogin = false;
                        accessToken = null;
                        loginId = 0;
                        methodsWrapper();
                        console.log("Unauthenticated Session");
                    }
                }

                function methodsWrapper() {
                    if ($scope.isLogin) {
                        getjobpostDetailsByAppuserId();
                        getAccountDetails();
                    } else {
                        $scope.hasService = false;
                        $scope.hasCompany = false;
                        $scope.isAgent = false;
                        $scope.hasJobpost = false;
                    }
                }

                function getAccountDetails() {
                    accountFactory.getAccountDetailsByAppuserId(accessToken, loginId, loginId)
                            .success(function(accountResponse) {
                                if (codeManagerFactory.isSuccess(accountResponse.returnCode)) {
                                    $scope.appuser = accountResponse.appuser;
                                    $scope.profile = accountResponse.profile;
                                    $scope.agent = accountResponse.agent;
                                    $scope.lstService = accountResponse.lstService;

                                    // Be carefull with the Asych potential problem here.
                                    getMembershipType();
                                } else {
                                    message = codeManagerFactory.getMessage(accountResponse.returnCode);
                                    toastr.error(message);
                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getMembershipType() {
                    if ($scope.profile) {
                        $scope.hasProfile = true;
                    }

                    if ($scope.agent) {
                        $scope.isAgent = true;
                    }

                    if ($scope.lstService) {
                        $scope.hasService = true;
                    }

                    if (sharedDataFactory.companyId) {
                        $scope.hasCompany = true;
                    }
                }

                function getjobpostDetailsByAppuserId() {
                    jobpostFactory.getjobpostDetailsByAppuserId(loginId, loginId)
                            .success(function(jobpostDetailsResponse) {
                                console.log(jobpostDetailsResponse);
                                message = codeManagerFactory.getMessage(jobpostDetailsResponse.returnCode);
                                if (codeManagerFactory.isSuccess(jobpostDetailsResponse.returnCode)) {
                                    $scope.lstJobpost = jobpostDetailsResponse.lstJobpost;
                                    $scope.hasJobpost = true;
                                } else {
                                    $scope.hasJobpost = false;
                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                $scope.createService = function() {
                    if ($scope.isLogin) {
                        if ($scope.hasProfile) {
                            toastr.info("Choose <strong>Category</strong> > <strong>Service</strong> > <strong>I am providing a service</strong>.");
                            window.location.href = '#!/postad';
                        } else {
                            window.location.href = '#!/createprofile/service';
                        }
                    } else {
                        toastr.info("Choose <strong>Category</strong> > <strong>Service</strong> > <strong>I am providing a service</strong>.");
                        $rootScope.agent = '';
                        sharedDataFactory.postad = 'providing';
                        window.location.href = '#!/postad';
                    }
                };

                $scope.manageService = function() {
                    sharedDataFactory.serviceTab = true;
                    window.location.href = '#!/mydashboard';
                };

                $scope.redirectToManageJobpost = function() {
                    if ($scope.isLogin && $scope.jobpostType == 'free') {
                        toastr.info("Select a category then the service you're looking.");
                        window.location.href = '#!/postad';
                    } else if ($scope.isLogin && $scope.jobpostType == 'premium') {
                        setTimeout(function() {
                            $('.close').click();
                        }, 300);
                        setTimeout(function() {
                            window.location.href = '#!/createjobpost/premium';
                        }, 500);
                    } else {
                        if ($scope.jobpostType == 'premium') {
                            $rootScope.isPremiumJobpostSelected = true;
                        } else {
                            $rootScope.isPremiumJobpostSelected = false;
                            $rootScope.agent = '';
                            sharedDataFactory.postad = 'looking';
                        }
                        window.location.href = '#!/login';
                    }
                };

                $scope.manageJobpost = function() {
                    sharedDataFactory.jobpostTab = true;
                    window.location.href = '#!/mydashboard';
                };

                $scope.registerAsAgent = function() {
                    if ($scope.isLogin) {
                        if ($scope.hasProfile) {
                            sharedDataFactory.agentTab = true;
                            window.location.href = '#!/mydashboard';
                        } else {
                            window.location.href = '#!/createprofile/agent';
                        }
                    } else {
                        window.location.href = '#!/quickagentregister';
                    }
                };

                $scope.manageMyAgent = function() {
                    sharedDataFactory.agentTab = true;
                    window.location.href = '#!/mydashboard';
                };

                $scope.registerCompany = function() {
                    if ($scope.isLogin) {
                        if ($scope.hasProfile) {
                            window.location.href = '#!/registercompany';
                        } else {
                            window.location.href = '#!/createprofile/company';
                        }
                    } else {
                        window.location.href = '#!/quickcompanyregister';
                    }
                };

                $scope.manageMyCompany = function() {
                    sharedDataFactory.companyTab = true;
                    window.location.href = '#!/mydashboard';
                };
                
                $scope.showJobpostModal = function() {
                    setTimeout(function() {
                        $('#jobpostTypeModalButton').click();
                    }, 300);
                };
                
                $scope.htmlReady();
                
            }]);