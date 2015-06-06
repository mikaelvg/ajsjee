'use strict';

angular.module('ajsjeeApp')
        .controller('viewProfileCtrl', ['$rootScope', '$scope', '$routeParams', '$route', '$modal', 'ipCookie', 'loginWrapperFactory', 'codeManagerFactory', 'serviceFactory', 'sessionService', 'accountFactory', 'agentFactory', 'companyFactory', 'employeeFactory', 'jobpostFactory', 'profileFactory', 'feedbackFactory', 'mapAppuserAgentFactory', 'mapAgentCfgagentpackageFactory', 'mapCompanyCfgcompanypackageFactory', 'ratingFactory', 'sendMailFactory', 'sharedDataFactory',
            function($rootScope, $scope, $routeParams, $route, $modal, ipCookie, loginWrapperFactory, codeManagerFactory, serviceFactory, sessionService, accountFactory, agentFactory, companyFactory, employeeFactory, jobpostFactory, profileFactory, feedbackFactory, mapAppuserAgentFactory, mapAgentCfgagentpackageFactory, mapCompanyCfgcompanypackageFactory, ratingFactory, sendMailFactory, sharedDataFactory) {

                var appuserId = $routeParams.appuserid;
                var selectedTab = $routeParams.selectedtab;
                var loginId = sessionService.getAppuserId();
                var accessToken = sessionService.getAccessToken();
                var viewportWidth = $(window).width();
                var message;
                var landlineLength;
                var landlineStart;
                $scope.viewportSize = viewportWidth;

                $(window).resize(function() {
                    viewportWidth = $(window).width();
                    $scope.$apply(function() {
                        $scope.viewportSize = viewportWidth;
                    });
                });

                if (!loginId) {
                    if (ipCookie('cookieOAuthProvider')) {
                        $scope.sessionDetailsResponsePromise = loginWrapperFactory.getSessionDetails(ipCookie('cookieOAuthProvider'));
                        $scope.sessionDetailsResponsePromise
                                .then(function(sessionDetailsResponse) {
                                    sessionService = sessionDetailsResponse;
                                    if (codeManagerFactory.isSuccess(sessionService.getReturnCode())) {
                                        loginId = sessionService.getAppuserId();
                                        if (selectedTab) {
                                            hasSelectedTab();
                                        } else {
                                            methodsWrapper();
                                        }
                                    } else {
                                        if (!appuserId) {
                                            toastr.info('Please register or login!');
                                            window.location.href = '#!/login';
                                        } else {
                                            notLogin();
                                        }
                                    }
                                });
                    } else {
                        if (!appuserId) {
                            toastr.info('Please register or login!');
                            window.location.href = '#!/login';
                        } else {
                            notLogin();
                        }
                    }
                } else {
                    if (selectedTab) {
                        hasSelectedTab();
                    } else {
                        methodsWrapper();
                    }
                }

                function notLogin() {
                    loginId = 0;
                    accessToken = null;
                    if (selectedTab) {
                        hasSelectedTab();
                    } else {
                        methodsWrapper();
                    }
                }

                function hasSelectedTab() {
                    accessToken = sessionService.getAccessToken();
                    switch (selectedTab) {
                        case 'services':
                        case 'service':
                            sharedDataFactory.serviceTab = '';
                            sharedDataFactory.jobpostTab = '';
                            sharedDataFactory.agentTab = '';
                            sharedDataFactory.companyTab = '';
                            sharedDataFactory.feedbackTab = '';
                            $scope.serviceTab = true;
                            methodsWrapper();
                            break;
                        case 'jobpostings':
                        case 'jobposting':
                            sharedDataFactory.serviceTab = '';
                            sharedDataFactory.jobpostTab = '';
                            sharedDataFactory.agentTab = '';
                            sharedDataFactory.companyTab = '';
                            sharedDataFactory.feedbackTab = '';
                            $scope.jobpostTab = true;
                            getjobpostDetailsByAppuserId();
                            methodsWrapper();
                            break;
                        case 'agent':
                            sharedDataFactory.serviceTab = '';
                            sharedDataFactory.jobpostTab = '';
                            sharedDataFactory.agentTab = true;
                            sharedDataFactory.companyTab = '';
                            sharedDataFactory.feedbackTab = '';
                            if (appuserId) {
                                window.location.href = '#!/viewprofile/' + appuserId;
                            } else {
                                window.location.href = '#!/mydashboard';
                            }
                            break;
                        case 'company':
                            sharedDataFactory.serviceTab = '';
                            sharedDataFactory.jobpostTab = '';
                            sharedDataFactory.agentTab = '';
                            sharedDataFactory.companyTab = '';
                            sharedDataFactory.feedbackTab = '';
                            $scope.companyTab = true;
                            $scope.isCompanyTabSelected = true;
                            getCompanyDetailsByAppuserId();
                            methodsWrapper();
                            break;
                        case 'feedback':
                            sharedDataFactory.serviceTab = '';
                            sharedDataFactory.jobpostTab = '';
                            sharedDataFactory.agentTab = '';
                            sharedDataFactory.companyTab = '';
                            sharedDataFactory.feedbackTab = true;
                            if (appuserId) {
                                window.location.href = '#!/viewprofile/' + appuserId;
                            } else {
                                window.location.href = '#!/mydashboard';
                            }
                            break;
                        default:
                            window.location.href = '#!/home';
                    }
                }

                function methodsWrapper() {
                    accessToken = sessionService.getAccessToken();

                    if (loginId == appuserId || !appuserId) {
                        $scope.sameUser = true;
                    } else {
                        $scope.sameUser = false;
                    }

                    if (!sharedDataFactory.agentId) {
                        getMapAppuserAgentByAppuserId();
                    }

                    if (sharedDataFactory.agentId) {
                        $scope.isCreateAgentMode = false;
                        $scope.isWithAgent = true;
                        $scope.createAgent = true;
                    } else {
                        $scope.isCreateAgentMode = true;
                        $scope.isWithAgent = false;
                        $scope.createAgent = false;
                    }

                    if (appuserId) {
                        if (appuserId != loginId) {
                            $scope.isNotRated = true;
                            $scope.editFeedback = true;
                            $scope.hasRatedFeedback = true;
                            $scope.editFeedbackMode = false;
                        }
                    } else {
                        $scope.myDashboard = true;
                    }

                    if (!appuserId && loginId > 0) {
                        $scope.isLogin = true;
                        if (sharedDataFactory.agentTab) {
                            sharedDataFactory.agentTab = '';
                            getAgentDetails();
                            setTimeout(function() {
                                $scope.agentTab = true;
                            }, 200);
                            scrollTo('#agentTitle');
                        } else if (sharedDataFactory.jobpostTab) {
                            sharedDataFactory.jobpostTab = '';
                            getjobpostDetailsByAppuserId();
                            setTimeout(function() {
                                $scope.jobpostTab = true;
                            }, 200);
                        } else if (sharedDataFactory.serviceTab) {
                            sharedDataFactory.serviceTab = '';
                            $scope.serviceTab = true;
                        } else if (sharedDataFactory.companyTab) {
                            $scope.isCompanyTabSelected = true;
                            sharedDataFactory.companyTab = '';
                            getCompanyDetailsByAppuserId();
                            setTimeout(function() {
                                $scope.companyTab = true;
                            }, 200);
                        }
                    } else {
                        getRatingByAppuserId();
                        if ($rootScope.selectAgentTab) {
                            $rootScope.selectAgentTab = '';
                            getAgentDetails();
                            setTimeout(function() {
                                $scope.agentTab = true;
                            }, 300);
                        } else if (sharedDataFactory.companyTab) {
                            $scope.isCompanyTabSelected = true;
                            sharedDataFactory.companyTab = '';
                            getCompanyDetailsByAppuserId();
                            setTimeout(function() {
                                $scope.companyTab = true;
                            }, 300);
                        }
                    }
                    getProfileByAppuserId();

                    $scope.activationPackages = false;
                    $scope.hasServiceProviders = false;
                    $scope.currentPage = 1;
                    $scope.agentPackage = 1;
                    $scope.appuserId = appuserId;
                    $scope.loginId = loginId;

                    if (sharedDataFactory.feedbackTab) {
                        setTimeout(function() {
                            $scope.feedbackTab = true;
                        }, 300);
                        sharedDataFactory.feedbackTab = '';
                        if (!$scope.feedbackClicked) {
                            getFeedbackByAppuserId();
                        }
                    }

                    getAccountDetails();
                    loadLookups();

                    setTimeout(function() {
                        $('html, body').animate({scrollTop: '#scrollTo'});
                    }, 300);
                }

                function getAccountDetails() {
                    if (!appuserId) {
                        $scope.appuserId = loginId;
                    } else {
                        $scope.appuserId = appuserId;
                    }
                    accountFactory.getAccountDetailsByAppuserId(accessToken, loginId, $scope.appuserId)
                            .success(function(accountResponse) {
                                if (codeManagerFactory.isSuccess(accountResponse.returnCode)) {
                                    $scope.appuser = accountResponse.appuser;
                                    $scope.profile = accountResponse.profile;
                                    $scope.agentProfile = accountResponse.agentProfile;
                                    $scope.agent = accountResponse.agent;
                                    $scope.isMyAgentActive = accountResponse.isMyAgentActive;
                                    $scope.lstBadgeCredential = accountResponse.lstBadgeCredential;

                                    if (appuserId) {
                                        if (!$scope.isCompanyTabSelected) {
                                            $scope.isCompanyActive = accountResponse.isCompanyActive;
                                        }
                                        $scope.isCompanyTabSelected = false;
                                        $scope.lstPublishedservice = accountResponse.lstPublishedservice;
                                        console.log($scope.lstPublishedservice);
                                        $scope.titleHead = 'col-lg-4 col-md-4 col-sm-4';
                                        $scope.descriptionHead = 'col-lg-6 col-md-5 col-sm-5';
                                        $scope.priceUnitHead = 'col-lg-2 col-md-3 col-sm-3';
                                        if (accountResponse.lstPublishedservice) {
                                            $scope.currentPageService = 1;
                                            $scope.recordCountService = accountResponse.lstPublishedservice.length;
                                            $scope.hasServices = true;
                                        } else {
                                            $scope.recordCount = 0;
                                            $scope.hasServices = false;
                                        }
                                        $scope.doneLoadingServiceList = true;
                                    } else {
                                        $scope.isCompanyActive = accountResponse.isCompanyActive;
                                        $scope.lstService = accountResponse.lstService;
                                        console.log($scope.lstService);
                                        $scope.titleHead = 'col-lg-3 col-md-3 col-sm-2';
                                        $scope.descriptionHead = 'col-lg-4 col-md-4 col-sm-6';
                                        $scope.priceUnitHead = 'col-lg-2 col-md-3 col-sm-3';
                                        if (accountResponse.lstService) {
                                            $scope.currentPageService = 1;
                                            $scope.recordCountService = accountResponse.lstService.length;
                                            $scope.hasServices = true;
                                        } else {
                                            $scope.recordCount = 0;
                                            $scope.hasServices = false;
                                        }
                                        $scope.doneLoadingServiceList = true;
                                    }

                                    if (!$scope.profileRated) {
                                        $scope.showFeedback = true;
                                    }

                                    if ($scope.appuser) {
                                        if (loginId > 0) {
                                            if (loginId != $scope.appuser.pkAppuserId) {
                                                $scope.isNotServiceProvider = true;
                                            }
                                        }
                                    }

                                    if ($scope.agentProfile) {
                                        $scope.mobileNumber = $scope.agentProfile.mobileNumber;
                                        $scope.businessEmail = $scope.agentProfile.businessEmail;
                                        $scope.landline = $scope.agentProfile.landline;
                                        if ($scope.profile.landline) {
                                            landlineLength = $scope.profile.landline.length;
                                            landlineStart = landlineLength - 7;
                                            $scope.areaCode = parseInt($scope.profile.landline.substring(0, landlineStart));
                                            $scope.landlineNumber = $scope.profile.landline.substring(landlineStart, landlineLength);
                                        }
                                    } else if ($scope.profile) {
                                        $scope.mobileNumber = $scope.profile.mobileNumber;
                                        $scope.businessEmail = $scope.profile.businessEmail;
                                        $scope.landline = $scope.profile.landline;
                                        if ($scope.profile.landline) {
                                            landlineLength = $scope.profile.landline.length;
                                            landlineStart = landlineLength - 7;
                                            $scope.areaCode = parseInt($scope.profile.landline.substring(0, landlineStart));
                                            $scope.landlineNumber = $scope.profile.landline.substring(landlineStart, landlineLength);
                                        }
                                    }

                                    console.log(accountResponse.ratingResponse);
                                    if (accountResponse.ratingResponse) {
                                        if (codeManagerFactory.isSuccess(accountResponse.ratingResponse.returnCode)) {
                                            $scope.hasRatings = true;
                                            $scope.ratingLength = accountResponse.ratingResponse.ratingLength;
                                            $scope.ratingCount = accountResponse.ratingResponse.ratingCount;
                                            $scope.currentRating = accountResponse.ratingResponse.averageRating;
                                        } else {
                                            $scope.hasRatings = false;
                                        }
                                    } else {
                                        $scope.hasRatings = false;
                                    }

                                    if (accountResponse.profile) {
                                        $scope.hasProfile = true;
                                        $scope.doneLoadingProfile = true;
                                        if (loginId == $scope.profile.fkAppuserId.pkAppuserId && !appuserId) {
                                            $scope.isServiceProvider = true;
                                        } else {
                                            $scope.isServiceProvider = false;
                                        }
                                    } else {
                                        $scope.noProfile = true;
                                        $scope.doneLoadingProfile = true;
                                    }

                                    if ($scope.agent && $scope.noAgent && !sharedDataFactory.agentId
                                            && loginId > 0 && $scope.isMyAgentActive
                                            && !$scope.agentProfile && $scope.currentAppuserProfile) {
                                        $scope.makeAsMyAgentButton = true;
                                    }

                                    if (!$scope.isMyAgentActive && !$scope.agentProfile
                                            && $scope.lstMapAppuserAgent && !appuserId && loginId > 0) {
//                                        $scope.expiredAgentAccount = true;
                                        if ($scope.appuserAgent) {
                                            if (appuserId == $scope.appuserAgent.fkAgentId.fkAppuserId.pkAppuserId
                                                    && !sharedDataFactory.agentId) {
                                                $scope.showAgentTab = true;
                                            }
                                        }
                                    } else {
//                                        $scope.expiredAgentAccount = false;
                                    }

                                    if (sharedDataFactory.agentId) {
                                        if ($scope.lstPublishedservice && !$scope.agent
                                                && !$scope.agentProfile && $scope.profile) {
                                            $scope.inviteAsServiceProviderButton = true;
                                        }
                                        if ($scope.agent) {
                                            $scope.showAgentTab = true;
                                        }
                                    }

                                    if ($scope.serviceProviderWithAgent && !$scope.isMyAgentActive) {
                                        $scope.inactiveAgent = true;
                                    }

                                    if ($scope.removeAsMyAgentButton && $scope.isMyAgentActive) {
                                        $scope.showAgentTab = true;
                                    }
                                } else {
                                    message = codeManagerFactory.getMessage(accountResponse.returnCode);
                                    toastr.error(message);
                                    window.location.href = '#!/home';
                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error');
                                window.location.href = '#!/home';
                            });
                }

                function getFeedbackByAppuserId() {
                    if (!appuserId) {
                        $scope.appuserId = loginId;
                    } else {
                        $scope.appuserId = appuserId;
                    }
                    feedbackFactory.getFeedbackByRatedAppuserId(loginId, $scope.appuserId, $scope.currentPage)
                            .success(function(feedbackResponse) {
                                console.log(feedbackResponse);
                                message = codeManagerFactory.getMessage(feedbackResponse.returnCode);
                                if (codeManagerFactory.isSuccess(feedbackResponse.returnCode)) {
                                    $scope.lstFeedback = feedbackResponse.lstFeedback;
                                    if ($scope.lstFeedback) {
                                        if (viewportWidth > 768) {
                                            $scope.isLargeScreen = true;
                                        }
                                        if (feedbackResponse.recordCount > 0) {
                                            $scope.recordCount = feedbackResponse.recordCount;
                                        }
//                                        for (var i = 0; i <= $scope.lstFeedback.length; i++) {
//                                            $scope.feedbackLimitSize[i] = 300;
//                                        }
                                        $scope.feedbackClicked = true;
                                    }
                                } else {
                                    $scope.lstFeedback = [];
                                    $scope.feedbackClicked = true;
                                    $scope.recordCount = false;
                                }
                                $scope.doneLoadingFeedbackList = true;
                            })
                            .error(function() {
                                $scope.lstFeedback = [];
                                $scope.doneLoadingFeedbackList = true;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getAgentDetails() {
                    if (!appuserId) {
                        $scope.appuserId = loginId;
                    } else {
                        $scope.appuserId = appuserId;
                    }
                    agentFactory.getAgentDetailsByAppuserId(loginId, $scope.appuserId)
                            .success(function(AgentDetailsResponse) {
                                console.log(AgentDetailsResponse);
                                if (codeManagerFactory.isSuccess(AgentDetailsResponse.returnCode)) {
                                    $scope.agent = AgentDetailsResponse.agent;
                                    $scope.latestMapAgentCfgagentpackage = AgentDetailsResponse.latestMapAgentCfgagentpackageResponse.mapAgentCfgagentpackage;
                                    $scope.lstMapAppuserAgent = AgentDetailsResponse.mapAppuserAgentListResponse.lstMapAppuserAgent;
                                    $scope.lstCfgAgentpackage = AgentDetailsResponse.cfgAgentpackageListResponse.lstCfgAgentpackage;
                                    if ($scope.latestMapAgentCfgagentpackage) {
                                        if ($scope.latestMapAgentCfgagentpackage.expirationDate && sharedDataFactory.agentId) {
                                            $scope.hasExpirationDateAgent = 1;
                                            $scope.cfgAgentPackage = $scope.lstCfgAgentpackage[1];
                                        }
                                    } else {
                                        $scope.hasExpirationDateAgent = 0;
                                        $scope.cfgAgentPackage = $scope.lstCfgAgentpackage[0];
                                    }
                                    if ($scope.lstMapAppuserAgent) {
                                        if ($scope.lstMapAppuserAgent.length > 0) {
                                            $scope.recordCountAgent = $scope.lstMapAppuserAgent.length;
                                            $scope.currentPageAgent = 1;
                                            $scope.hasServiceProviders = true;
                                        } else {
                                            $scope.recordCountAgent = 0;
                                        }
                                        if (!appuserId) {
                                            $scope.isAgent = true;
                                        }
                                    } else {
                                        $scope.recordCountAgent = 0;
                                        $scope.hasServiceProviders = false;
                                    }
                                    $scope.agentClicked = true;
//                                    if (!$scope.isMyAgentActive && !$scope.agentProfile && $scope.lstMapAppuserAgent && !appuserId && loginId > 0) {
//                                        $scope.expiredAgentAccount = true;
//                                    } else {
//                                        $scope.expiredAgentAccount = false;
//                                    }
                                } else {
                                    message = codeManagerFactory.getMessage(AgentDetailsResponse.returnCode);
                                    console.log("Error : " + message);
                                    $scope.agentClicked = true;
                                }
                                $scope.doneLoadingServiceproviderList = true;
                            })
                            .error(function() {
                                $scope.doneLoadingServiceproviderList = true;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getRatingByAppuserId() {
                    ratingFactory.getRatingByAppuserId(accessToken, loginId, appuserId)
                            .success(function(ratingResponse) {
                                console.log(ratingResponse);
                                message = codeManagerFactory.getMessage(ratingResponse.returnCode);
                                if (codeManagerFactory.isSuccess(ratingResponse.returnCode)) {
                                    $scope.rate = ratingResponse.lstRating[0].rate;
                                    $scope.pkRatingId = ratingResponse.lstRating[0].pkRatingId;
                                    $scope.hasRatedFeedback = true;
                                    $scope.updateRatingProfile = true;
                                }
                            })
                            .error(function() {
//                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getProfileByAppuserId() {
                    profileFactory.getProfileByAppuserId(loginId, loginId)
                            .success(function(profileResponse) {
                                message = codeManagerFactory.getMessage(profileResponse.returnCode);
                                if (codeManagerFactory.isSuccess(profileResponse.returnCode)) {
                                    $scope.currentAppuserProfile = profileResponse.profile;
                                    if (profileResponse) {
                                        $scope.iswithagent = profileResponse.profile.iswithagent;
                                    }
                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getMapAppuserAgentByAppuserId() {
                    mapAppuserAgentFactory.getMapAppuserAgentByAppuserId(loginId, loginId)
                            .success(function(mapAppuserAgentResponse) {
                                console.log(mapAppuserAgentResponse.mapAppuserAgent);
                                if (codeManagerFactory.isSuccess(mapAppuserAgentResponse.returnCode)) {
                                    $scope.appuserAgent = mapAppuserAgentResponse.mapAppuserAgent;
                                    if (appuserId == $scope.appuserAgent.fkAgentId.fkAppuserId.pkAppuserId && !sharedDataFactory.agentId) {
                                        $scope.removeAsMyAgentButton = true;
                                    }
                                    if (!appuserId && !sharedDataFactory.agentId) {
                                        $scope.myAgentAppuserId = $scope.appuserAgent.fkAgentId.fkAppuserId.pkAppuserId;
                                        $scope.serviceProviderWithAgent = true;
                                    }
                                } else {
                                    if (!sharedDataFactory.agentId && sessionService.getProfileId()) {
                                        $scope.noAgent = true;
                                    }
                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function changeIspublishedJobpost(Jobpost) {
                    jobpostFactory.changeIsPublishedJobpost(accessToken, loginId, Jobpost.pkJobpostId)
                            .success(function(ReturnCodeResponse) {
                                message = codeManagerFactory.getMessage(ReturnCodeResponse.returnCode);
                                if (codeManagerFactory.isSuccess(ReturnCodeResponse.returnCode)) {
                                    toastr.info(message);
                                    getjobpostDetailsByAppuserId();
                                } else {
                                    toastr.error(message);
                                }
                                $scope.changeIsPublishedJobpostClicked = false;
                            })
                            .error(function() {
                                $scope.changeIsPublishedJobpostClicked = false;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function changeIsPublishedService(Service) {
                    serviceFactory.changeIsPublishedService(accessToken, loginId, Service.pkServiceId)
                            .success(function(ReturnCodeResponse) {
                                message = codeManagerFactory.getMessage(ReturnCodeResponse.returnCode);
                                if (codeManagerFactory.isSuccess(ReturnCodeResponse.returnCode)) {
                                    toastr.info(message);
                                    getAccountDetails();
                                } else {
                                    toastr.error(message);
                                }
                                $scope.changeIsPublishedServiceClicked = false;
                            })
                            .error(function() {
                                $scope.changeIsPublishedServiceClicked = false;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function removeEmployee(employeeId) {
                    employeeFactory.removeEmployee(accessToken, loginId, employeeId)
                            .success(function(ReturnCodeResponse) {
                                console.log(ReturnCodeResponse);
                                message = codeManagerFactory.getMessage(ReturnCodeResponse.returnCode);
                                if (codeManagerFactory.isSuccess(ReturnCodeResponse.returnCode)) {
                                    toastr.info(message);
                                    $scope.getCompanyDetailsByAppuserId();
                                } else {
                                    toastr.info(message);
                                }
                                $scope.confirmRemoveButton = false;
                            })
                            .error(function() {
                                $scope.confirmRemoveButton = false;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function loadLookups() {
                    $scope.priceUnit = sharedDataFactory.priceUnit;
                    $scope.serviceType = sharedDataFactory.serviceType;
                    $scope.privacylevel = sharedDataFactory.privacylevel;
                    $scope.employeeStatus = sharedDataFactory.employeeStatus;
                    $scope.companyTypes = sharedDataFactory.companyTypes;
                }

                /* google maps */

                function writeAddressName(latLng) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        "location": latLng
                    },
                    function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            $('#showAddress').show();
                            $('#error').hide();
                            document.getElementById('address').innerHTML = results[0].formatted_address;
                        } else {
                            $('#showAddress').hide();
                            $('#error').show();
                            document.getElementById('error').innerHTML = '';
                            document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
                        }
                    });
                }

                function geolocationSuccess(position) {
                    var googleMap = $scope.profile.googleMap;
                    $scope.coordinates = googleMap.split(", ");
                    var userLatLng = new google.maps.LatLng($scope.coordinates[0], $scope.coordinates[1]);
                    writeAddressName(userLatLng);

                    var myOptions = {
                        zoom: 16,
                        center: userLatLng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
                    new google.maps.Marker({
                        map: mapObject,
                        position: userLatLng
                    });
                }

                function geolocationError() {
                    $('.modal-backdrop.fade.in').hide();
                    toastr.error('ajsjee locator not available!');
                }

                function clearFeedback() {
                    setTimeout(function() {
                        getFeedbackByAppuserId();
                        $('#postfeedback').click();
                        $scope.feedback = null;
                        document.getElementById('feedback').value = '';
                        $scope.editFeedbackMode = false;
                        $scope.feedbackRequired = false;
                        $scope.showFeedback = true;
                    }, 500);
                }

                // this is for agent

                function removeServiceProviderOfAgent(mapAppuserAgentId) {
                    mapAppuserAgentFactory.removeMapAppuserAgent(accessToken, loginId, mapAppuserAgentId)
                            .success(function(returnCodeResponse) {
                                message = codeManagerFactory.getMessage(returnCodeResponse.returnCode);
                                if (codeManagerFactory.isSuccess(returnCodeResponse.returnCode)) {
                                    getAgentDetails();
                                    toastr.info("Success deleting your service provider!");
                                } else {
                                    toastr.error("Error deleting your service provider!");
                                }
                                $scope.confirmRemoveButton = false;
                            })
                            .error(function() {
                                $scope.confirmRemoveButton = false;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getjobpostDetailsByAppuserId() {
                    if (appuserId) {
                        jobpostFactory.getJobpostDisplayListByAppuserId(appuserId, 0)
                                .success(function(JobpostDisplayListResponse) {
                                    console.log(JobpostDisplayListResponse);
                                    message = codeManagerFactory.getMessage(JobpostDisplayListResponse.returnCode);
                                    if (codeManagerFactory.isSuccess(JobpostDisplayListResponse.returnCode)) {
                                        $scope.lstJobpost = JobpostDisplayListResponse.lstJobpostDisplay;
                                        $scope.recordCountJobpost = JobpostDisplayListResponse.lstJobpostDisplay.length;
                                        $scope.currentPageJobpost = 1;
                                        $scope.hasJobpost = true;
                                        $scope.jobpostClicked = true;
                                    } else {
                                        $scope.recordCountJobpost = 0;
                                        $scope.hasJobpost = false;
                                        $scope.jobpostClicked = true;
                                    }
                                    $scope.doneLoadingJobpostingList = true;
                                })
                                .error(function() {
                                    $scope.doneLoadingJobpostingList = true;
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    } else {
                        $scope.isJobpost = true;
                        $scope.appuserId = loginId;
                        jobpostFactory.getjobpostDetailsByAppuserId(loginId, $scope.appuserId)
                                .success(function(jobpostDetailsResponse) {
                                    console.log(jobpostDetailsResponse);
                                    message = codeManagerFactory.getMessage(jobpostDetailsResponse.returnCode);
                                    if (codeManagerFactory.isSuccess(jobpostDetailsResponse.returnCode)) {
                                        $scope.lstJobpost = jobpostDetailsResponse.lstJobpost;
                                        $scope.recordCountJobpost = jobpostDetailsResponse.lstJobpost.length;
                                        $scope.currentPageJobpost = 1;
                                        $scope.hasJobpost = true;
                                        $scope.jobpostClicked = true;
                                    } else {
                                        $scope.recordCountJobpost = 0;
                                        $scope.hasJobpost = false;
                                        $scope.jobpostClicked = true;
                                    }
                                    $scope.doneLoadingJobpostingList = true;
                                })
                                .error(function() {
                                    $scope.doneLoadingJobpostingList = true;
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                }

                function removeJobpost(jobpostId) {
                    jobpostFactory.removejobpost(accessToken, loginId, jobpostId)
                            .success(function(ReturncodeResponse) {
                                message = codeManagerFactory.getMessage(ReturncodeResponse.returnCode);
                                if (codeManagerFactory.isSuccess(ReturncodeResponse.returnCode)) {
                                    getjobpostDetailsByAppuserId();
                                    toastr.info(message);
                                } else {
                                    toastr.error('Please email support. \nError details : ' + message);
                                }
                                $scope.confirmRemoveButton = false;
                            })
                            .error(function() {
                                $scope.confirmRemoveButton = false;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getCompanyDetailsByAppuserId() {
                    if (appuserId) {
                        $scope.pkAppuserId = appuserId;
                    } else {
                        $scope.pkAppuserId = loginId;
                    }
                    companyFactory.getCompanyDetailsByAppuserId(loginId, $scope.pkAppuserId)
                            .success(function(CompanyDetailsResponse) {
                                console.log(CompanyDetailsResponse);
                                message = codeManagerFactory.getMessage(CompanyDetailsResponse.returnCode);
                                if (codeManagerFactory.isSuccess(CompanyDetailsResponse.returnCode)) {
                                    if (!CompanyDetailsResponse.isCompanyActive && !$scope.myDashboard) {
                                        window.location.href = '#!/viewprofile/' + appuserId;
                                    } else {
                                        $scope.isCompanyTabSelected = false;
                                        $scope.company = CompanyDetailsResponse.company;
                                        $scope.isCompanyActive = CompanyDetailsResponse.isCompanyActive;
                                        $scope.latestMapCompanyCfgcompanypackage = CompanyDetailsResponse.latestMapCompanyCfgcompanypackageResponse.mapCompanyCfgcompanypackage;
                                        $scope.lstCfgCompanypackage = CompanyDetailsResponse.cfgCompanyListResponse.lstCfgCompanypackage;
                                        $scope.lstEmployees = CompanyDetailsResponse.employeeListResponse.lstEmployee;
                                        $scope.orderByField = 'firstName';
                                        $scope.reverseOrder = 'false';
                                        sharedDataFactory.companyId = $scope.company.pkCompanyId;
                                        console.log('with company');

                                        if ($scope.lstEmployees) {
                                            $scope.recordCountEmployees = $scope.lstEmployees.length;
                                            $scope.currentPageEmployees = 1;
                                        } else {
                                            $scope.recordCountEmployees = 0;
                                        }

                                        if ($scope.latestMapCompanyCfgcompanypackage) {
                                            if ($scope.latestMapCompanyCfgcompanypackage.expirationDate) {
                                                $scope.hasExpirationDateCompany = 1;
                                                $scope.cfgCompanyPackage = $scope.lstCfgCompanypackage[1];
                                            }
                                        } else {
                                            $scope.hasExpirationDateCompany = 0;
                                            $scope.cfgCompanyPackage = $scope.lstCfgCompanypackage[0];
                                        }
                                        $scope.hasCompany = true;
                                    }
                                } else {
                                    $scope.hasCompany = false;
                                    console.log('no company');
                                }
                                $scope.doneLoadingCompanyDetails = true;
                            })
                            .error(function() {
                                $scope.hasCompany = false;
                                $scope.doneLoadingCompanyDetails = true;
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function scrollTo(targetId) {
                    var topOffset;
                    var destination;
                    if (viewportWidth > 991) {
                        topOffset = 146;
                    } else {
                        topOffset = 80;
                    }
                    setTimeout(function() {
                        destination = $(targetId).offset().top - topOffset;
                        $('html, body').animate({scrollTop: destination}, 300);
                        setTimeout(function() {
                            $(targetId).focus();
                        }, 300);
                    }, 300);
                }

                $scope.scrollTo = function(targetId) {
                    scrollTo(targetId);
                };

                $scope.redirectedToManageService = function(cfgServiceId, serviceId) {
                    window.location.href = '#!/manageservice/' + cfgServiceId + '/' + serviceId;
                };

                $scope.inviteAsServiceProvider = function() {
                    if (!$scope.inviteAsServiceProviderClicked) {
                        $scope.inviteAsServiceProviderClicked = true;
                        var sendMailRequest = {
                            serviceProviderAppuser: $scope.appuser,
                            agentAppuser: sessionService.getAppuser()
                        };
                        console.log(sendMailRequest);
                        sendMailFactory.sendInvitationMessageToServiceProvider(accessToken, loginId, sendMailRequest)
                                .success(function(sendMailResponse) {
                                    toastr.info('Invitation sent!');
                                    $scope.inviteAsServiceProviderClicked = false;
                                })
                                .error(function() {
                                    $scope.inviteAsServiceProviderClicked = false;
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                };

                $scope.makeAsMyAgent = function() {
                    var mapAppuserAgent = {
                        'pkMapAppuserAgentId': null,
                        'fkAgentId': $scope.agent,
                        'fkServiceproviderAppuserId': sessionService.getAppuser()
                    };
                    $scope.disableMakeAsMyAgentButton = true;
                    mapAppuserAgentFactory.createMapAppuserAgent(accessToken, loginId, mapAppuserAgent)
                            .success(function(CreateUpdateResponse) {
                                message = codeManagerFactory.getMessage(CreateUpdateResponse.returnCode);
                                if (codeManagerFactory.isSuccess(CreateUpdateResponse.returnCode)) {
                                    getMapAppuserAgentByAppuserId();
                                    getAgentDetails();
                                    $scope.makeAsMyAgentButton = false;
                                    $scope.removeAsMyAgentButton = true;
                                    $scope.showAgentTab = true;
                                    toastr.info(message);
                                } else {
                                    toastr.error(message);
                                }
                                $scope.disableMakeAsMyAgentButton = false;
                            })
                            .error(function() {
                                $scope.disableMakeAsMyAgentButton = false;
                                toastr.error('Please email support', 'Server Error:');
                            });
                };

                $scope.removeAsMyAgent = function() {
                    $scope.disableRemoveAsMyAgentButton = true;
                    mapAppuserAgentFactory.removeMapAppuserAgent(accessToken, loginId, $scope.appuserAgent.pkMapAppuserAgentId)
                            .success(function(CreateUpdateResponse) {
                                message = codeManagerFactory.getMessage(CreateUpdateResponse.returnCode);
                                if (codeManagerFactory.isSuccess(CreateUpdateResponse.returnCode)) {
                                    getMapAppuserAgentByAppuserId();
                                    getAgentDetails();
                                    if ($scope.isMyAgentActive) {
                                        $scope.makeAsMyAgentButton = true;
                                    } else {
                                        sharedDataFactory.agentTab = true;
                                        window.location.href = '#!/mydashboard';
                                    }
                                    $scope.removeAsMyAgentButton = false;
                                    toastr.info(message);
                                } else {
                                    toastr.error(message);
                                }
                                $scope.disableRemoveAsMyAgentButton = false;
                            })
                            .error(function() {
                                $scope.disableRemoveAsMyAgentButton = false;
                                toastr.error('Please email support', 'Server Error:');
                            });
                };

                $scope.removeService = function(serviceId) {
                    serviceFactory.removeService(accessToken, loginId, serviceId)
                            .success(function(ReturncodeResponse) {
                                message = codeManagerFactory.getMessage(ReturncodeResponse.returnCode);
                                if (codeManagerFactory.isSuccess(ReturncodeResponse.returnCode)) {
                                    getAccountDetails(appuserId);
                                    toastr.info(message);
                                } else {
                                    toastr.error('Please email support. \nError details : ' + message);
                                }
                                $scope.confirmRemoveButton = false;
                            })
                            .error(function() {
                                $scope.confirmRemoveButton = false;
                                toastr.error('Please email support', 'Server Error:');
                            });

                };

                $scope.rateProfile = function() {
                    var rating = {
                        'rate': $scope.rate,
                        'raterAppuserId': loginId,
                        'fkRatedAppuserId': $scope.appuser
                    };

                    if ($scope.updateRatingProfile) {
                        rating.pkRatingId = $scope.pkRatingId;
                        ratingFactory.updateRating(accessToken, loginId, rating)
                                .success(function(returnCodeResponse) {
                                    message = codeManagerFactory.getMessage(returnCodeResponse.returnCode);
                                    if (codeManagerFactory.isSuccess(returnCodeResponse.returnCode)) {
                                        getAccountDetails(appuserId);
                                        toastr.info(message);
                                    } else {
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    } else {
                        ratingFactory.createRating(accessToken, loginId, rating)
                                .success(function(returnCodeResponse) {
                                    message = codeManagerFactory.getMessage(returnCodeResponse.returnCode);
                                    if (codeManagerFactory.isSuccess(returnCodeResponse.returnCode)) {
                                        $scope.profileRated = true;
                                        scrollTo('#feedback');
                                        getAccountDetails(appuserId);
                                        getRatingByAppuserId();
                                        toastr.info(message);
                                    } else {
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                };

                $scope.ratingHoveringOver = function(value) {
                    $scope.overStar = value;
                    $scope.percent = 100 * (value / 5);
                };

                $scope.ratingStates = [
                    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
                ];

                $scope.geolocate = false;
                $scope.geolocateUser = function() {
                    if (navigator.geolocation) {
                        if ($scope.geolocate == false) {
                            $scope.geolocate = true;
                            var positionOptions = {
                                enableHighAccuracy: true,
                                timeout: 10 * 1000 // 10 seconds
                            };
                            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
                        }
                    } else {
                        $('#showAddress').hide();
                        $('#error').show();
                        document.getElementById('error').innerHTML = '';
                        document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
                    }
                };

                $scope.clearAgent = function() {
                    document.querySelector('#agentTitle').value = '';
                    document.querySelector('#agentDescription').value = '';
                };

                $scope.saveAgent = function() {
                    if (!$scope.saveAgentButton) {
                        $scope.saveAgentButton = true;
                        $scope.agent = {
                            fkAppuserId: $scope.appuser,
                            agentTitle: document.querySelector('#agentTitle').value,
                            agentDescription: document.querySelector('#agentDescription').value,
                            pkAgentId: sharedDataFactory.agentId
                        };
                        console.log($scope.agent);
                        if ($scope.createAgent) {
                            agentFactory.updateAgent(accessToken, loginId, $scope.agent)
                                    .success(function(createUpdateResponse) {
                                        message = codeManagerFactory.getMessage(createUpdateResponse.returnCode);
                                        if (codeManagerFactory.isSuccess(createUpdateResponse.returnCode)) {
                                            sharedDataFactory.agentId = createUpdateResponse.lngId;
                                            sessionService.setAgentId(createUpdateResponse.lngId);
                                            $scope.agent.pkAgentId = createUpdateResponse.lngId;
                                            $scope.isCreateAgentMode = false;
                                            $scope.isWithAgent = true;
                                            getAgentDetails();
                                            getAccountDetails();
                                            toastr.info(message);
                                        } else {
                                            toastr.error(message);
                                        }
                                        $scope.saveAgentButton = false;
                                    })
                                    .error(function() {
                                        $scope.saveAgentButton = false;
                                        toastr.error('Please email support', 'Server Error');
                                    });
                        } else {
                            agentFactory.createAgent(accessToken, loginId, $scope.agent)
                                    .success(function(createUpdateResponse) {
                                        message = codeManagerFactory.getMessage(createUpdateResponse.returnCode);
                                        if (codeManagerFactory.isSuccess(createUpdateResponse.returnCode)) {
                                            sharedDataFactory.agentId = createUpdateResponse.lngId;
                                            sessionService.setAgentId(createUpdateResponse.lngId);
                                            $scope.agent.pkAgentId = createUpdateResponse.lngId;
                                            $scope.isCreateAgentMode = false;
                                            $scope.isWithAgent = true;
                                            $scope.createAgent = true;
                                            toastr.info(message);
                                            sharedDataFactory.agentTab = true;
                                            $route.reload();
                                        } else {
                                            toastr.error(message);
                                        }
                                        $scope.saveAgentButton = false;
                                    })
                                    .error(function() {
                                        $scope.saveAgentButton = false;
                                        toastr.error('Please email support', 'Server Error');
                                    });
                        }
                    }
                };

                $scope.editMode = function() {
                    $scope.isCreateAgentMode = true;
                    scrollTo('#agentTitle');
                };

                $scope.cancelAgent = function() {
                    $scope.confirmCancelEditMode();
                };

                $scope.confirmCancelEditMode = function() {
                    if (!$scope.confirmCancelEditModeButton) {
                        $scope.confirmCancelEditModeButton = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/confirmCancel.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function(agree) {
                            if (agree) {
                                $scope.isCreateAgentMode = false;
                                getAccountDetails();
                                getAgentDetails();
                            }
                            $scope.confirmCancelEditModeButton = false;
                        }, function() {
                            $scope.confirmCancelEditModeButton = false;
                            console.log("Cancelled");
                        });
                    }
                };

                $scope.agentActivation = function() {
                    if (!$scope.cfgAgentPackage) {
                        toastr.info('Choose my agent package');
                    } else if ($scope.cfgAgentPackage.pkCfgAgentpackageId == 1) {
                        var mapAppuserAgent = {
                            fkAgentId: $scope.agent,
                            fkCfgAgentpackageId: $scope.cfgAgentPackage
                        };
                        console.log(mapAppuserAgent);
                        mapAgentCfgagentpackageFactory.createMapAgentCfgagentpackage(accessToken, loginId, mapAppuserAgent)
                                .success(function(createUpdateResponse) {
                                    message = codeManagerFactory.getMessage(createUpdateResponse.returnCode);
                                    console.log(createUpdateResponse);
                                    if (codeManagerFactory.isSuccess(createUpdateResponse.returnCode)) {
                                        toastr.info(message);
                                        getAgentDetails();
                                        setTimeout(function() {
                                            $('.close').click();
                                        }, 300);
                                    } else {
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    } else {
                        toastr.error('Not yet implemented!');
                    }
                };

                $scope.setAgentPackage = function(cfgAgentPackage) {
                    $scope.cfgAgentPackage = cfgAgentPackage;
                };

                $scope.confirmRemove = function(id, remove) {
                    if (!$scope.confirmRemoveButton) {
                        $scope.confirmRemoveButton = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/confirmDelete.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function(agree) {
                            if (agree == true) {
                                if (remove == 'company') {
                                    removeEmployee(id);
                                } else if (remove == 'service') {
                                    $scope.removeService(id);
                                } else if (remove == 'jobpost') {
                                    removeJobpost(id);
                                } else {
                                    removeServiceProviderOfAgent(id);
                                }
                            }
                        }, function() {
                            $scope.confirmRemoveButton = false;
                            console.log("Cancelled deletion");
                        });
                    }
                };

                $scope.editJobpostRedirect = function(cfgServiceId, jobpostId) {
                    if (cfgServiceId) {
                        window.location.href = '#!/managejobpost/' + cfgServiceId + '/' + jobpostId;
                    } else {
                        window.location.href = '#!/managejobpost/premium/' + jobpostId;
                    }
                };

                $scope.setAgentTab = function() {
                    if (!$scope.inactiveAgent) {
                        $rootScope.selectAgentTab = true;
                    }
                };

                $scope.commentProfile = function() {
                    var showName = document.getElementById('showName').checked;
                    var feedback = document.querySelector('#feedback').value;
                    if (feedback) {
                        if (!$scope.commentProfileButton) {
                            $scope.commentProfileButton = true;
                            if (!showName) {
                                showName = false;
                            }
                            var feedbackDetails = {
                                raterMessage: feedback,
                                showName: showName,
                                fkRatedAppuserId: $scope.appuser,
                                fkRaterAppuserId: {pkAppuserId: loginId}
                            };

                            if ($scope.editFeedbackMode) {
                                feedbackDetails.pkFeedbackId = $scope.feedback.pkFeedbackId;
                                feedbackFactory.updateFeedback(accessToken, loginId, feedbackDetails)
                                        .success(function(returnCodeResponse) {
                                            message = codeManagerFactory.getMessage(returnCodeResponse.returnCode);
                                            if (codeManagerFactory.isSuccess(returnCodeResponse.returnCode)) {
                                                toastr.info(message);
                                                if ($scope.currentPage > 1) {
                                                    sharedDataFactory.feedbackTab = true;
                                                    $route.reload();
                                                } else {
                                                    clearFeedback();
                                                }
                                            } else {
                                                toastr.error(message);
                                            }
                                            $scope.commentProfileButton = false;
                                        })
                                        .error(function() {
                                            $scope.commentProfileButton = false;
                                            toastr.error('Please email support', 'Server Error:');
                                        });
                            } else {
                                feedbackFactory.createFeedback(accessToken, loginId, feedbackDetails)
                                        .success(function(returnCodeResponse) {
                                            message = codeManagerFactory.getMessage(returnCodeResponse.returnCode);
                                            if (codeManagerFactory.isSuccess(returnCodeResponse.returnCode)) {
                                                toastr.info(message);
                                                if ($scope.currentPage > 1) {
                                                    sharedDataFactory.feedbackTab = true;
                                                    $route.reload();
                                                } else {
                                                    clearFeedback();
                                                }
                                            } else {
                                                toastr.error(message);
                                            }
                                            $scope.commentProfileButton = false;
                                        })
                                        .error(function() {
                                            $scope.commentProfileButton = false;
                                            toastr.error('Please email support', 'Server Error:');
                                        });
                            }
                        }
                    } else {
                        scrollTo('#feedback');
                        toastr.error('Feedback required!');
                    }
                };

                $scope.startEditFeedbackMode = function(Feedback) {
                    if (!$scope.startEditFeedbackModeButton) {
                        $scope.startEditFeedbackModeButton = true;
                        $scope.editFeedbackMode = true;
                        $scope.feedback = Feedback;
                        console.log(Feedback);
                        document.getElementById('showName').checked = Feedback.showName;
                        document.querySelector('#feedback').value = Feedback.raterMessage;
                        setTimeout(function() {
                            $('#postfeedback').click();
                            scrollTo('#feedback');
                            $scope.editFeedbackMode = true;
                            $scope.feedbackRequired = true;
                            $scope.showFeedback = false;
                            $scope.startEditFeedbackModeButton = false;
                        }, 500);
                    }
                };

                $scope.showFeedbackForm = function() {
                    if (!$scope.editFeedbackMode) {
                        document.getElementById('showName').checked = '';
                    }
                    $scope.showFeedback = false;
                    $scope.feedbackRequired = true;
                    if ($scope.rate) {
                        scrollTo('#feedback');
                    }
                };

                $scope.cancelFeedback = function() {
                    if (!$scope.cancelFeedbackButton) {
                        $scope.cancelFeedbackButton = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/confirmCancel.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function(agree) {
                            if (agree) {
                                clearFeedback();
                                $scope.cancelFeedbackButton = false;
                            }
                        }, function() {
                            $scope.cancelFeedbackButton = false;
                            console.log("Cancelled Rater Comment");
                        });
                    }
                };

                $scope.confirmRemoveFeedback = function(feedbackId) {
                    if (!$scope.confirmRemoveFeedbackButton) {
                        $scope.confirmRemoveFeedbackButton = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/confirmDelete.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function(agree) {
                            if (agree == true) {
                                $scope.removeFeedback(feedbackId);
                                $scope.confirmRemoveFeedbackButton = false;
                            }
                        }, function() {
                            $scope.confirmRemoveFeedbackButton = false;
                            console.log("Cancelled Rater Comment");
                        });
                    }
                };

                $scope.removeFeedback = function(feedbackId) {
                    if (!$scope.removeFeedbackButton) {
                        $scope.removeFeedbackButton = true;
                        feedbackFactory.removeFeedback(accessToken, loginId, feedbackId)
                                .success(function(ReturncodeResponse) {
                                    message = codeManagerFactory.getMessage(ReturncodeResponse.returnCode);
                                    if (codeManagerFactory.isSuccess(ReturncodeResponse.returnCode)) {
                                        if ($scope.lstFeedback.length == 1 && $scope.currentPage != 1) {
                                            $scope.currentPage = $scope.currentPage - 1;
                                        }
                                        getFeedbackByAppuserId();
                                        toastr.info(message);
                                    } else {
                                        toastr.error('Please email support. \nError details : ' + message);
                                    }
                                    $scope.removeFeedbackButton = false;
                                })
                                .error(function() {
                                    $scope.removeFeedbackButton = false;
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                };

                $scope.pageChanged = function(currentPage) {
                    $scope.currentPage = currentPage;
                    getFeedbackByAppuserId();
                };

                $scope.viewProfile = function(appuserId) {
                    window.location.href = '#!/viewprofile/' + appuserId;
                };

                $scope.getFeedback = function() {
                    if (!$scope.feedbackClicked) {
                        getFeedbackByAppuserId();
                    }
                };

                $scope.getJobpost = function() {
                    if (!$scope.jobpostClicked) {
                        getjobpostDetailsByAppuserId();
                    }
                };

                $scope.getAgentDetails = function() {
                    if (!$scope.agentClicked) {
                        getAgentDetails();
                    } else {
                        scrollTo('#agentTitle');
                    }
                };

                $scope.postFeedbackNotLogin = function() {
                    sharedDataFactory.feedbackTab = true;
                    $rootScope.urlPage = 'viewprofile/' + appuserId;
                    window.location.href = '#!/login';
                    toastr.info('Please register or login!');
                };

                $scope.redirectToViewService = function(Service, serviceView) {
                    console.log(Service);
                    if (Service.serviceStatus == 1 && Service.ispublished && !Service.fkEmployeeId) {
                        if (serviceView == 'service') {
                            window.location.href = '#!/viewservice/' + Service.pkServiceId;
                        } else {
                            window.location.href = '#!/viewservice/' + Service.pkPublishedserviceId;
                        }
                    } else if (Service.serviceStatus == 1 && Service.ispublished && Service.fkEmployeeId) {
                        if (serviceView == 'service') {
                            window.location.href = '#!/viewservice/' + Service.pkServiceId + '/' + Service.fkEmployeeId.pkEmployeeId;
                        } else {
                            window.location.href = '#!/viewservice/' + Service.pkPublishedserviceId + '/' + Service.fkEmployeeId.pkEmployeeId;
                        }
                    }
                };

                $scope.redirectToViewJobpost = function(Jobpost) {
                    console.log(Jobpost);
                    if ($scope.isJobpost) {

                    } else {
                        window.location.href = '#!/viewjobpost/' + Jobpost.pkPublishedjobpostId;
                    }

                    if (Jobpost.jobpostStatus == 1 && Jobpost.ispublished) {
                        if (appuserId) {
                            window.location.href = '#!/viewjobpost/' + Jobpost.pkPublishedjobpostId;
                        } else {
                            window.location.href = '#!/viewjobpost/' + Jobpost.pkJobpostId;
                        }
                    }
                };

                $scope.sortFieldBy = function(fieldName) {
                    $scope.orderByField = fieldName;
                    if ($scope.reverseOrder == 'false') {
                        $scope.reverseOrder = 'reverse';
                    } else {
                        $scope.reverseOrder = 'false';
                    }
                };

                $scope.getCompanyDetailsByAppuserId = function() {
                    getCompanyDetailsByAppuserId();
                };

                $scope.setCompanyPackage = function(cfgCompanyPackage) {
                    $scope.cfgCompanyPackage = cfgCompanyPackage;
                };

                $scope.companyActivation = function() {
                    if (!$scope.cfgCompanyPackage) {
                        toastr.info('Choose company package');
                    } else if ($scope.cfgCompanyPackage.pkCfgCompanypackageId == 1) {
                        var mapCompanyCfgcompanypackageData = {
                            fkCompanyId: $scope.company,
                            fkCfgCompanypackageId: $scope.cfgCompanyPackage
                        };
                        console.log(mapCompanyCfgcompanypackageData);
                        mapCompanyCfgcompanypackageFactory.createMapCompanyCfgcompanypackage(accessToken, loginId, mapCompanyCfgcompanypackageData)
                                .success(function(createUpdateResponse) {
                                    console.log(createUpdateResponse);
                                    message = codeManagerFactory.getMessage(createUpdateResponse.returnCode);
                                    if (codeManagerFactory.isSuccess(createUpdateResponse.returnCode)) {
                                        toastr.info(message);
                                        $scope.getCompanyDetailsByAppuserId();
                                        setTimeout(function() {
                                            $('.close').click();
                                        }, 300);
                                    } else {
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    } else {
                        toastr.error('Not yet implemented!');
                    }
                };

                $scope.changeIsPublishedJobpost = function(Jobpost) {
                    if (!$scope.changeIsPublishedJobpostClicked) {
                        $scope.changeIsPublishedJobpostClicked = true;
                        console.log(Jobpost);
                        if (Jobpost.ispublished) {
                            var modalInstance = $modal.open({
                                templateUrl: 'app/views/dialog/confirmUnpublishedJobpost.html',
                                controller: 'confirmDialogCtrl'
                            });
                            modalInstance.result.then(function() {
                                changeIspublishedJobpost(Jobpost);
                                $scope.changeIsPublishedJobpostClicked = false;
                            }, function() {
                                $scope.changeIsPublishedJobpostClicked = false;
                                console.log("Cancelled");
                            });
                        } else {
                            changeIspublishedJobpost(Jobpost);
                        }
                    }
                };

                $scope.changeIsPublishedService = function(Service) {
                    if (!$scope.changeIsPublishedServiceClicked) {
                        $scope.changeIsPublishedServiceClicked = true;
                        console.log(Service);
                        if (Service.ispublished) {
                            var modalInstance = $modal.open({
                                templateUrl: 'app/views/dialog/confirmUnpublishedService.html',
                                controller: 'confirmDialogCtrl'
                            });
                            modalInstance.result.then(function() {
                                changeIsPublishedService(Service);
                                $scope.changeIsPublishedServiceClicked = false;
                            }, function() {
                                $scope.changeIsPublishedServiceClicked = false;
                                console.log("Cancelled");
                            });
                        } else {
                            changeIsPublishedService(Service);
                        }
                    }
                };

                $scope.switchTab = function(newTab) {
                    if (selectedTab) {
                        if (newTab != selectedTab) {
                            switch (newTab) {
                                case 'contact details':
                                    if (appuserId) {
                                        window.location.href = '#!/viewprofile/' + appuserId;
                                    } else {
                                        window.location.href = '#!/mydashboard';
                                    }
                                    break;
                                case 'services':
                                    if (appuserId) {
                                        window.location.href = '#!/viewprofile/' + appuserId + '/services';
                                    } else {
                                        window.location.href = '#!/mydashboard/services';
                                    }
                                    break;
                                case 'job postings':
                                    if (appuserId) {
                                        window.location.href = '#!/viewprofile/' + appuserId + '/jobpostings';
                                    } else {
                                        window.location.href = '#!/mydashboard/jobpostings';
                                    }
                                    break;
                                case 'agent':
                                    sharedDataFactory.agentTab = true;
                                    if (appuserId) {
                                        window.location.href = '#!/viewprofile/' + appuserId;
                                    } else {
                                        window.location.href = '#!/mydashboard';
                                    }
                                    break;
                                case 'company':
                                    if (appuserId) {
                                        window.location.href = '#!/viewprofile/' + appuserId + '/company';
                                    } else {
                                        window.location.href = '#!/mydashboard/company';
                                    }
                                    break;
                                case 'feedback':
                                    sharedDataFactory.feedbackTab = true;
                                    if (appuserId) {
                                        window.location.href = '#!/viewprofile/' + appuserId;
                                    } else {
                                        window.location.href = '#!/mydashboard';
                                    }
                                    break;
                                default:
                            }
                        }
                    } else {
                        switch (newTab) {
                            case 'job postings':
                                $scope.getJobpost();
                                break;
                            case 'agent':
                                $scope.getAgentDetails();
                                break;
                            case 'company':
                                $scope.getCompanyDetailsByAppuserId();
                                break;
                            case 'feedback':
                                $scope.getFeedback();
                                break;
                        }
                    }
                };

                $scope.enlargeBadgeCredential = function(badgeCredential) {
                    if (!$scope.enlargeBadgeCredentialClicked) {
                        $scope.enlargeBadgeCredentialClicked = true;
                        $rootScope.badgeCredentialInfo = badgeCredential.fkCfgBadgeCredentialId;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/badgeCredential.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function() {
                            // do nothing
                        }, function() {
                            $rootScope.badgeCredentialInfo = '';
                            $scope.enlargeBadgeCredentialClicked = false;
                            console.log("Closed");
                        });
                    }
                };
            }]);