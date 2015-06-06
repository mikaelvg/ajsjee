'use strict';
angular.module('ajsjeeApp')
        .controller('headerCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$route', '$modal', 'sessionService', 'ipCookie', 'cfgCategoryFactory', 'locationFactory', 'sharedDataFactory', 'loginWrapperFactory', 'codeManagerFactory', 'constantFactory',
            function($rootScope, $scope, $location, $routeParams, $route, $modal, sessionService, ipCookie, cfgCategoryFactory, locationFactory, sharedDataFactory, loginWrapperFactory, codeManagerFactory, constantFactory) {

                $scope.currentPath = $location.path();
                $scope.sharedData = sharedDataFactory;
                $scope.lstCfgCategory = sharedDataFactory.lstCfgCategory;
                $scope.lstCfgBarangay = sharedDataFactory.lstCfgBarangay;
                $scope.lstCfgCitytown = sharedDataFactory.lstCfgCitytown;
                $scope.lstCfgStateprovince = sharedDataFactory.lstCfgStateprovince;
                var viewportWidth = $(window).width();
                var hostName = $location.host();
                var message;
                var popup;
                var url;
                $('.modal-backdrop.fade.in').hide();
                $scope.viewportSize = viewportWidth;

                // detect viewport size
                $(window).resize(function() {
                    viewportWidth = $(window).width();
                    $scope.$apply(function() {
                        $scope.viewportSize = viewportWidth;
                    });
//                    repositionSearch();
                });

                function repositionSearch() {
                    if ($scope.currentPath.indexOf('/viewcompany/') != -1) {
                        // do nothing
                    } else {
                        if (viewportWidth > 974) {
                            $('.container-fluid.search').css({'margin-top': '81px'});
                        } else if (viewportWidth < 975) {
                            $('.container-fluid.search').css({'margin-top': '50px'});
                        }
                    }
                }

                $rootScope.isChrome = !!window.chrome && !$rootScope.isOpera;
                $rootScope.isFirefox = typeof InstallTrigger !== 'undefined';
                $rootScope.isIE = /*@cc_on!@*/false || document.documentMode;
                $rootScope.isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                $rootScope.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

                console.log('isChrome : ' + $rootScope.isChrome + ' | isFirefox : ' + $rootScope.isFirefox
                        + ' | isIE : ' + $rootScope.isIE + ' | isOpera : ' + $rootScope.isOpera
                        + ' | isSafari : ' + $rootScope.isSafari);

                if ($scope.currentPath.indexOf('/viewcompany/') != -1) {
                    $scope.navbarFixedTop = '';
                } else {
                    $scope.navbarFixedTop = 'navbar-fixed-top';
                }

                $(window).scroll(function() {
                    switch (true) {
                        case ($scope.currentPath.indexOf('/viewcompany/') != -1):
                            $scope.navbarFixedTop = '';
                            break;
                        default:
                            $scope.navbarFixedTop = 'navbar-fixed-top';
                            var verticalScrollPosition = $(this).scrollTop();
                            if (verticalScrollPosition) {
                                $('#navbarShadow').addClass('navbar-box-shadow');
                            } else {
                                $('#navbarShadow').removeClass('navbar-box-shadow');
                            }

                            if (verticalScrollPosition > 150) {
                                $('#goToTopButton').fadeIn('slow');
                            } else {
                                $('#goToTopButton').fadeOut('slow');
                            }
                    }
                });

                getAllCfgCategory();
                getCfgCitytownList();
//                getAllCfgStateprovince();
                loadLookups();

                if ($routeParams.registermethod || $scope.currentPath == '/login') {
                    $scope.isRegisterPage = true;
                }

                $scope.param = {
                    searchKey: null,
                    searchTypeId: null,
                    cfgCategoryId: null,
                    location: null
                };

                if ($routeParams.searchkey) {
                    $scope.param.searchKey = $routeParams.searchkey;
                } else {
                    $scope.param.searchKey = '';
                }

                if ($routeParams.searchtype > 0) {
                    $scope.param.searchTypeId = parseInt($routeParams.searchtype);
                } else {
                    $scope.param.searchTypeId = 1;
                }

                if ($routeParams.cfgcategoryid > 0) {
                    $scope.param.cfgCategoryId = parseInt($routeParams.cfgcategoryid);
                } else {
                    $scope.param.cfgCategoryId = 'all'; // All categories
                }

                var splittedLocationParams;
                if ($routeParams.location != 'all' && $routeParams.location != null) {
                    switch (true) {
                        case ($routeParams.location.indexOf('barangay=') != -1):
//                            splittedLocationParams = $routeParams.location.split('=');
//                            if (splittedLocationParams[1] != null && splittedLocationParams[1]) {
//                                $scope.cfgBarangayId = splittedLocationParams[1];
//                                $scope.cfgCitytownId = null;
//                                $scope.cfgStateprovinceId = null;
//                                getCfgBarangayByCfgBarangayId(splittedLocationParams[1]);
//                                getAllCfgBarangay();
//                            }
//                            $scope.selectedLocation = 'Barangay';
                            $scope.selectedLocation = 'City/town';
                            $scope.cfgCitytownId = true;
                            $scope.param.location = '';
                            $scope.selectedCfgBarangayId = '';
                            $scope.selectedCfgCityTownId = '';
                            $scope.selectedCfgStateprovinceId = '';
                            break;
                        case ($routeParams.location.indexOf('city=') != -1 || $routeParams.location.indexOf('town=') != -1):
                            splittedLocationParams = $routeParams.location.split('=');
                            if (splittedLocationParams[1] != null && splittedLocationParams[1]) {
                                $scope.cfgBarangayId = null;
                                $scope.cfgCitytownId = splittedLocationParams[1];
                                $scope.cfgStateprovinceId = null;
                                getCfgCitytownByCfgCitytownId(splittedLocationParams[1]);
                            }
                            $scope.selectedLocation = 'City/town';
                            break;
                        case ($routeParams.location.indexOf('province=') != -1 || $routeParams.location.indexOf('state=') != -1):
//                            splittedLocationParams = $routeParams.location.split('=');
//                            if (splittedLocationParams[1] != null && splittedLocationParams[1]) {
//                                $scope.cfgBarangayId = null;
//                                $scope.cfgCitytownId = null;
//                                $scope.cfgStateprovinceId = splittedLocationParams[1];
//                                getCfgStateprovinceByCfgStateprovinceId(splittedLocationParams[1]);
//                            }
//                            $scope.selectedLocation = 'State/province';
                            $scope.selectedLocation = 'City/town';
                            $scope.cfgCitytownId = true;
                            $scope.param.location = '';
                            $scope.selectedCfgBarangayId = '';
                            $scope.selectedCfgCityTownId = '';
                            $scope.selectedCfgStateprovinceId = '';
                            break;
                        default:
                            if (!$scope.param.searchKey) {
                                window.location.href = "#!/search/" + $scope.param.searchTypeId + "/" +
                                        $scope.param.cfgCategoryId + "/all";
                            } else {
                                window.location.href = "#!/search/" + $scope.param.searchTypeId + "/" +
                                        $scope.param.cfgCategoryId + "/all/" + $scope.param.searchKey;
                            }
                    }
                } else {
                    $scope.selectedLocation = 'City/town';
                    $scope.cfgCitytownId = true;
                    $scope.param.location = '';
                    $scope.selectedCfgBarangayId = '';
                    $scope.selectedCfgCityTownId = '';
                    $scope.selectedCfgStateprovinceId = '';
                }

                $scope.isLoginRedirect = function(url) {
                    if ($scope.sharedData.loginId) {
                        window.location.href = '#!/' + url;
                    } else {
                        toastr.info('Please login or register');
                        if (!$routeParams.registermethod) {
                            $rootScope.urlPage = url;
                            window.location.href = '#!/login';
                        }
                    }
                };

                $scope.setCfgBarangayId = function(selectedCfgBarangayId) {
                    $scope.cfgBarangayResponse = selectedCfgBarangayId;
                    if (selectedCfgBarangayId) {
                        $scope.param.location = 'barangay=' + selectedCfgBarangayId.pkCfgBarangayId;
                        console.log($scope.param.location);
                    }
                };

                $scope.setCfgCitytownId = function(selectedCfgCitytownId) {
                    $scope.cfgCitytownResponse = selectedCfgCitytownId;
                    if (selectedCfgCitytownId) {
                        $scope.param.location = 'city=' + selectedCfgCitytownId.pkCfgCitytownId;
                        console.log($scope.param.location);
                    }
                };

                $scope.setCfgStateprovinceId = function(selectedCfgStateprovinceId) {
                    $scope.cfgStateprovinceResponse = selectedCfgStateprovinceId;
                    if (selectedCfgStateprovinceId) {
                        $scope.param.location = 'province=' + selectedCfgStateprovinceId.pkCfgStateprovinceId;
                        console.log($scope.param.location);
                    }
                };

                $scope.clearLocationId = function() {
                    if (!$scope.firstLoad) {
                        $scope.firstLoad = true;
                        $('.typeahead-no-result-found').hide();
                        $scope.startTypeahead = true;
                    }
                    $scope.param.location = '';
                    setTimeout(function() {
                        var selectedLocationId = null;
                        if ($scope.cfgBarangayId) {
                            selectedLocationId = document.getElementById('selectedCfgBarangayId').value;
                        } else if ($scope.cfgCitytownId) {
                            selectedLocationId = document.getElementById('selectedCfgCityTownId').value;
                        } else if ($scope.cfgStateprovinceId) {
                            selectedLocationId = document.getElementById('selectedCfgStateprovinceId').value;
                        }
                        if ($('.input-location > ul').is(':visible') || selectedLocationId == '') {
                            $('.typeahead-no-result-found').hide();
                        } else {
                            $('.typeahead-no-result-found').show();
                        }
                    }, 100);
                };

                $scope.hideNoResultFound = function() {
                    $('.typeahead-no-result-found').hide();
                };

                $scope.searchDatabase = function() {
                    if (!$scope.param.cfgCategoryId) {
                        $scope.param.cfgCategoryId = 'all';
                    }
                    if ($scope.cfgBarangayId && !$scope.param.location) {
                        $scope.param.location = 'all';
                    } else if ($scope.cfgCitytownId && !$scope.param.location) {
                        $scope.param.location = 'all';
                    } else if ($scope.cfgStateprovinceId && !$scope.param.location) {
                        $scope.param.location = 'all';
                    } else if (!$scope.param.location) {
                        $scope.param.location = 'all';
                    }
                    if (!$scope.param.searchKey) {
                        window.location.href = "#!/search/" + $scope.param.searchTypeId + "/" +
                                $scope.param.cfgCategoryId + "/" + $scope.param.location;
                    } else {
                        window.location.href = "#!/search/" + $scope.param.searchTypeId + "/" +
                                $scope.param.cfgCategoryId + "/" + $scope.param.location + "/" + $scope.param.searchKey;
                    }
                };

                $scope.logout = function() {
                    sessionService.setAppuserId();
                    sessionService.setAgentId();
                    sessionService.setAccessToken();
                    sharedDataFactory.agentTab = '';
                    sharedDataFactory.cfgServiceId = '';
                    sharedDataFactory.feedbackTab = '';
                    sharedDataFactory.firstName = '';
                    sharedDataFactory.fromUrl = '';
                    sharedDataFactory.jobpostTab = '';
                    sharedDataFactory.loginId = '';
                    sharedDataFactory.accountId = '';
                    sharedDataFactory.agentId = '';
                    sharedDataFactory.companyId = '';
                    sharedDataFactory.notRegistered = '';
                    sharedDataFactory.oAuthProvider = '';
                    sharedDataFactory.profileId = '';
                    sharedDataFactory.popupWasBlocked = '';
                    sharedDataFactory.postad = '';
                    sharedDataFactory.serviceTab = '';
                    sharedDataFactory.employeeId = '';
                    sharedDataFactory.companyTab = '';
                    sharedDataFactory.currentServerDate = '';
                    sharedDataFactory.lstMapCfgserviceCfgcategory = '';
                    sharedDataFactory.picture = '';
                    var cookieOAuthProvider = ipCookie('cookieOAuthProvider');
                    ipCookie.remove('cookieOAuthProvider');
                    if (cookieOAuthProvider === 'google') {
                        hello.logout(cookieOAuthProvider, {force: true});
                        document.location.href = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://' + hostName;
                    } else if (cookieOAuthProvider === 'yahoo') {
                        url = 'https://login.yahoo.com/config/login?.src=fpctx&logout=1';
                        popup = window.open(url, '', 'menubar=no,resizable=no,width=10,height=10');
                        setTimeout(function() {
                            popup.close();
                        }, 3000);
                    }
                    hello.logout(cookieOAuthProvider, {force: true});
                    window.location.href = '#!/logout';
                    toastr.info('Logout successful');
                };

                $scope.checkIfAccountExist = function(OAuthProvider) {
                    hello.logout(OAuthProvider, {force: true});
                    setTimeout(function() {
                        if (!$scope.loginButton) {
                            $scope.loginButton = true;
                            $scope.sessionDetailsResponsePromise = loginWrapperFactory.getSessionDetails(OAuthProvider, 'login');
                            $scope.sessionDetailsResponsePromise
                                    .then(function(sessionService) {
                                        if (codeManagerFactory.isSuccess(sessionService.getReturnCode())) {
                                            toastr.info('Login successful');
                                            if (sharedDataFactory.postad) {
                                                var postad = sharedDataFactory.postad.split('/');
                                                if (postad[0] == 'createservice' && sessionService.getProfileId()) {
                                                    window.location.href = '#!/' + sharedDataFactory.postad;
                                                } else if (postad[0] == 'createservice' && !sessionService.getProfileId()) {
                                                    window.location.href = '#!/createprofile/service';
                                                } else if (postad[0] == 'createjobpost') {
                                                    window.location.href = '#!/' + sharedDataFactory.postad;
                                                    sharedDataFactory.postad = '';
                                                }
                                            } else {
                                                $route.reload();
                                            }
                                            $scope.loginButton = false;
                                        } else {
                                            $scope.loginButton = false;
                                            sharedDataFactory.notRegistered = true;
                                            window.location.href = '#!/register/' + OAuthProvider;
                                        }
                                    });
                        }
                    }, 500);
                };

                $scope.goToTop = function() {
                    $('html, body').animate({scrollTop: 0}, 300);
                };

                function getAllCfgCategory() {
                    if (!sharedDataFactory.lstCfgCategory) {
                        cfgCategoryFactory.getAllCfgCategory()
                                .success(function(CfgCategoryListResponse) {
                                    if (codeManagerFactory.isSuccess(CfgCategoryListResponse.returnCode)) {
                                        sharedDataFactory.lstCfgCategory = CfgCategoryListResponse.lstCfgCategory;
                                        $scope.lstCfgCategory = CfgCategoryListResponse.lstCfgCategory;
                                    } else {
                                        message = codeManagerFactory.getMessage(CfgCategoryListResponse.returnCode);
                                        toastr.info(message);
                                    }
                                })
                                .error(function() {
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                }

                function getCfgBarangayByCfgBarangayId(CfgBarangayId) {
                    locationFactory.getAddressByBarangayId(CfgBarangayId)
                            .success(function(CfgBarangayResponse) {
                                if (codeManagerFactory.isSuccess(CfgBarangayResponse.returnCode)) {
                                    $scope.selectedCfgBarangayId = CfgBarangayResponse.cfgBarangay.barangayName + ', '
                                            + CfgBarangayResponse.cfgBarangay.fkCfgCitytownId.citytownName;
                                    $scope.param.location = $routeParams.location;
                                } else {
                                    message = codeManagerFactory.getMessage(CfgBarangayResponse.returnCode);
                                    toastr.error(message);
                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getCfgCitytownByCfgCitytownId(CfgCitytownId) {
                    locationFactory.getCfgCitytownByCfgCitytownId(CfgCitytownId)
                            .success(function(cfgCitytownResponse) {
                                if (codeManagerFactory.isSuccess(cfgCitytownResponse.returnCode)) {
                                    $scope.selectedCfgCityTownId = cfgCitytownResponse.cfgCitytown.citytownName + ', '
                                            + cfgCitytownResponse.cfgCitytown.fkCfgStateprovinceId.stateprovinceName;
                                    $scope.param.location = $routeParams.location;
                                } else {
                                    message = codeManagerFactory.getMessage(cfgCitytownResponse.returnCode);
                                    toastr.error(message);
                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getCfgStateprovinceByCfgStateprovinceId(cfgStateprovinceId) {
                    locationFactory.getCfgStateprovinceByCfgStateprovinceId(cfgStateprovinceId)
                            .success(function(CfgStateprovinceResponse) {
                                if (codeManagerFactory.isSuccess(CfgStateprovinceResponse.returnCode)) {
                                    $scope.selectedCfgStateprovinceId = CfgStateprovinceResponse.cfgStateprovince.stateprovinceName;
                                    $scope.param.location = $routeParams.location;
                                } else {
                                    message = codeManagerFactory.getMessage(CfgStateprovinceResponse.returnCode);
                                    toastr.error(message);
                                }
                            })
                            .error(function() {
                                toastr.error('Please email support', 'Server Error:');
                            });
                }

                function getAllCfgBarangay() {
                    $scope.barangayPlaceholder = 'Loading barangay list...';
                    if (sharedDataFactory.lstCfgBarangay) {
                        $scope.lstCfgBarangay = sharedDataFactory.lstCfgBarangay;
                        $scope.barangayPlaceholder = 'Input Philippine barangay...';
                        $scope.isDoneLoadingCfgBarangay = true;
                        $scope.barangayLoadingError = false;
                    } else {
                        locationFactory.getAllCfgBarangay()
                                .success(function(CfgBarangayListResponse) {
                                    console.log(CfgBarangayListResponse);
                                    if (codeManagerFactory.isSuccess(CfgBarangayListResponse.returnCode)) {
                                        sharedDataFactory.lstCfgBarangay = CfgBarangayListResponse.lstCfgBarangay;
                                        $scope.lstCfgBarangay = CfgBarangayListResponse.lstCfgBarangay;
                                        $scope.barangayPlaceholder = 'Input Philippine barangay...';
                                        $scope.isDoneLoadingCfgBarangay = true;
                                        $scope.barangayLoadingError = false;
                                        $('.typeahead-no-result-found').hide();
                                    } else {
                                        $scope.barangayLoadingError = true;
                                        $scope.barangayPlaceholder = 'Error loading barangay list!';
                                        message = codeManagerFactory.getMessage(CfgBarangayListResponse.returnCode);
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    $scope.barangayLoadingError = true;
                                    $scope.barangayPlaceholder = 'Error loading barangay list!';
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                }

                function getCfgCitytownList() {
                    $scope.cityTownPlaceholder = 'Loading city or town list...';
                    if (sharedDataFactory.lstCfgCitytown) {
                        $scope.lstCfgCitytown = sharedDataFactory.lstCfgCitytown;
                        $scope.cityTownPlaceholder = 'Input Philippine city or town...';
                        $scope.isDoneLoadingCfgCitytown = true;
                        $scope.citytownLoadingError = false;
                    } else {
                        locationFactory.getAllCfgCitytown()
                                .success(function(citytownListResponse) {
                                    if (codeManagerFactory.isSuccess(citytownListResponse.returnCode)) {
                                        sharedDataFactory.lstCfgCitytown = citytownListResponse.lstCfgCitytown;
                                        $scope.lstCfgCitytown = citytownListResponse.lstCfgCitytown;
                                        $scope.cityTownPlaceholder = 'Input Philippine city or town...';
                                        $scope.isDoneLoadingCfgCitytown = true;
                                        $scope.citytownLoadingError = false;
                                        $('.typeahead-no-result-found').hide();
                                    } else {
                                        $scope.citytownLoadingError = true;
                                        $scope.cityTownPlaceholder = 'Error loading city or town list!';
                                        message = codeManagerFactory.getMessage(citytownListResponse.returnCode);
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    $scope.citytownLoadingError = true;
                                    $scope.cityTownPlaceholder = 'Error loading city or town list!';
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                }

                function getAllCfgStateprovince() {
                    $scope.stateprovincePlaceholder = 'Loading state or province list...';
                    if (sharedDataFactory.lstCfgStateprovince) {
                        $scope.lstCfgStateprovince = sharedDataFactory.lstCfgStateprovince;
                        $scope.stateprovincePlaceholder = 'Input Philippine state or province...';
                        $scope.isDoneLoadingCfgStateprovince = true;
                        $scope.stateprovinceLoadingError = false;
                    } else {
                        locationFactory.getAllCfgStateprovince()
                                .success(function(CfgStateprovinceListResponse) {
                                    console.log(CfgStateprovinceListResponse);
                                    if (codeManagerFactory.isSuccess(CfgStateprovinceListResponse.returnCode)) {
                                        sharedDataFactory.lstCfgStateprovince = CfgStateprovinceListResponse.lstCfgStateprovince;
                                        $scope.lstCfgStateprovince = CfgStateprovinceListResponse.lstCfgStateprovince;
                                        $scope.stateprovincePlaceholder = 'Input Philippine state or province...';
                                        $scope.isDoneLoadingCfgStateprovince = true;
                                        $scope.stateprovinceLoadingError = false;
                                        $('.typeahead-no-result-found').hide();
                                    } else {
                                        $scope.stateprovinceLoadingError = true;
                                        $scope.stateprovincePlaceholder = 'Error loading state or province list!';
                                        message = codeManagerFactory.getMessage(CfgStateprovinceListResponse.returnCode);
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    $scope.stateprovinceLoadingError = true;
                                    $scope.stateprovincePlaceholder = 'Error loading state or province list!';
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                }

                function loadLookups() {
                    $scope.searchType = [
                        {id: 1, description: 'Service Providers'},
                        {id: 2, description: 'Service Packages'},
                        {id: 3, description: 'For Rents'},
                        {id: 4, description: 'Job Openings'}
                    ];
                }

                $scope.reloadConstants = function() {
                    if (!$scope.reloadConstantsButton) {
                        $scope.reloadConstantsButton = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/confirmReloadConstants.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function() {
                            constantFactory.reloadContants()
                                    .success(function(ReturnCodeResponse) {
                                        console.log(ReturnCodeResponse);
                                        if (codeManagerFactory.isSuccess(ReturnCodeResponse.returnCode)) {
                                            toastr.info('Success in reloading constants!');
                                        } else {
                                            message = codeManagerFactory.getMessage(ReturnCodeResponse.returnCode);
                                            toastr.error(message);
                                        }
                                        $scope.reloadConstantsButton = false;
                                    })
                                    .error(function() {
                                        toastr.error('Please email support', 'Server Error');
                                        $scope.reloadConstantsButton = false;
                                    });
                        }, function() {
                            $scope.reloadConstantsButton = false;
                            console.log("Cancelled");
                        });
                    }
                };

                $scope.selectLocation = function(location) {
                    if (location == 'all') {
                        $scope.selectedLocation = 'Entire Philippines';
                        $scope.param.location = 'all';
                        $scope.startTypeahead = false;
                        $('.typeahead-no-result-found').hide();
                        setTimeout(function() {
                            $('.typeahead-no-result-found').hide();
                            $scope.startTypeahead = true;
                        }, 100);
                    } else if (location != $scope.selectedLocation) {
                        $scope.selectedLocation = location;
                        $scope.startTypeahead = false;
                        $('.typeahead-no-result-found').hide();
                        setTimeout(function() {
                            $('.typeahead-no-result-found').hide();
                            $scope.startTypeahead = true;
                        }, 100);
                        switch (location) {
                            case 'Barangay':
                                $scope.cfgBarangayId = true;
                                $scope.cfgCitytownId = null;
                                $scope.cfgStateprovinceId = null;
                                getAllCfgBarangay();
                                break;
                            case 'City/town':
                                $scope.cfgBarangayId = null;
                                $scope.cfgCitytownId = true;
                                $scope.cfgStateprovinceId = null;
                                break;
                            case 'State/province':
                                $scope.cfgBarangayId = null;
                                $scope.cfgCitytownId = null;
                                $scope.cfgStateprovinceId = true;
                                break;
                            default:
                                $scope.cfgBarangayId = true;
                                $scope.cfgCitytownId = null;
                                $scope.cfgStateprovinceId = null;
                        }
                        $scope.selectedCfgBarangayId = '';
                        $scope.selectedCfgCityTownId = '';
                        $scope.selectedCfgStateprovinceId = '';
                        $scope.param.location = 'all';
                    }
                };

                if (document.domain === 'www.ajsjee.com' || document.domain === 'ajsjee.com') {
                    console.log('www.ajsjee.com');
                    (function(i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function() {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                        a = s.createElement(o),
                                m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                    ga('create', 'UA-57570038-1', 'auto');
                    ga('send', 'pageview', {'page': $scope.currentPath});
                } else if (document.domain === 'buildph.ajsjee.com') {
                    console.log('buildph.ajsjee.com');
                    (function(i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function() {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                        a = s.createElement(o),
                                m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                    ga('create', 'UA-57571642-1', 'auto');
                    ga('send', 'pageview', {'page': $scope.currentPath});
                }
            }]);