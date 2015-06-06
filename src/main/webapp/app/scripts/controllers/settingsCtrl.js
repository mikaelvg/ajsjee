'use strict';
angular.module('ajsjeeApp')
        .controller('settingsCtrl', ['$scope', '$modal', '$route', '$routeParams', '$filter', 'ipCookie', 'loginWrapperFactory', 'codeManagerFactory', 'accountFactory', 'appuserFactory', 'companyFactory', 'profileFactory', 'locationFactory', 'sessionService', 'sharedDataFactory',
            function($scope, $modal, $route, $routeParams, $filter, ipCookie, loginWrapperFactory, codeManagerFactory, accountFactory, appuserFactory, companyFactory, profileFactory, locationFactory, sessionService, sharedDataFactory) {

                var loginId = sessionService.getAppuserId();
                var viewportWidth = $(window).width();
                var message;
                var accessToken;
                var imageFile;
                var imageReader;
                var noOfDays;
                var createRedirect;
                var landlineLength;
                var landlineStart;
                $scope.lstCfgCitytown = sharedDataFactory.lstCfgCitytown;

                $(window).resize(function() {
                    viewportWidth = $(window).width();
                });

                var handleFileSelect = function(image) {
                    imageFile = image.currentTarget.files[0];
                    imageReader = new FileReader();
                    imageReader.onload = function(image) {
                        $scope.$apply(function($scope) {
                            $scope.myImage = image.target.result;
                        });
                    };
                    imageReader.readAsDataURL(imageFile);
                };
                angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

                if (!loginId) {
                    if (ipCookie('cookieOAuthProvider')) {
                        $scope.sessionDetailsResponsePromise = loginWrapperFactory.getSessionDetails(ipCookie('cookieOAuthProvider'));
                        $scope.sessionDetailsResponsePromise
                                .then(function(sessionDetailsResponse) {
                                    sessionService = sessionDetailsResponse;
                                    if (codeManagerFactory.isSuccess(sessionService.getReturnCode())) {
                                        loginId = sessionService.getAppuserId();
                                        methodsWrapper();
                                    } else {
                                        toastr.info('Please register or login!');
                                        window.location.href = '#!/login';
                                    }
                                });
                    } else {
                        toastr.info('Please register or login!');
                        window.location.href = '#!/login';
                    }
                } else {
                    methodsWrapper();
                }

                function methodsWrapper() {
                    createRedirect = $routeParams.createredirect;
                    accessToken = sessionService.getAccessToken();

                    switch (sessionService.getNetwork()) {
                        case 'facebook':
                            $scope.facebook = true;
                            $scope.google = false;
                            break;
                        case 'google':
                            $scope.facebook = false;
                            $scope.google = true;
                            break;
                        default:
                            $scope.facebook = false;
                            $scope.google = false;
                    }

                    if (sharedDataFactory.profileId && createRedirect) {
                        if (createRedirect == 'agent') {
                            sharedDataFactory.agentTab = true;
                            window.location.href = '#!/mydashboard';
                        } else {
                            window.location.href = '#!/postad';
                        }
                    } else {
                        $scope.myImage = '';
                        $scope.croppedImage = '';
                        $scope.pictureFromOauthProvider = sharedDataFactory.picture;

                        $scope.appuser = {};
                        $scope.profile = {};
                        $scope.barangayList = {};
                        $scope.citytownList = {};
                        $scope.stateprovinceList = {};
                        $scope.countryList = {};

                        $scope.isEditAccountMode = true;
                        $scope.isEditProfileMode = true;
                        $scope.addProfilePicture = true;
                        $scope.removeProfilePic = false;
                        $scope.createModeProfile = true;
                        $scope.hasProfile = false;

                        getAccountDetails();
                        getCfgCitytownList();
                        loadLookups();
                    }
                }

                function getAccountDetails() {
                    accountFactory.getAccountDetailsByAppuserId(accessToken, loginId, loginId)
                            .success(function(accountResponse) {
                                if (codeManagerFactory.isSuccess(accountResponse.returnCode)) {
                                    $scope.appuser = accountResponse.appuser;
                                    var splitedBirthDate = $scope.appuser.birthday.split('/');
                                    $scope.birthYear = parseInt(splitedBirthDate[2]);
                                    $scope.birthMonth = parseInt(splitedBirthDate[0]);
                                    $scope.birthDay = parseInt(splitedBirthDate[1]);
                                    $scope.profile = accountResponse.profile;
                                    $scope.lstService = accountResponse.lstService;
                                    $scope.isCompanyActive = accountResponse.isCompanyActive;

                                    setDays($scope.birthMonth);

                                    if ($scope.profile) {
                                        $scope.googleMap = $scope.profile.googleMap;
                                        if ($scope.profile.landline) {
                                            landlineLength = $scope.profile.landline.length;
                                            landlineStart = landlineLength - 7;
                                            $scope.areaCode = parseInt($scope.profile.landline.substring(0, landlineStart));
                                            $scope.landlineNumber = $scope.profile.landline.substring(landlineStart, landlineLength);
                                        }
                                        if (createRedirect) {
                                            if (createRedirect == 'agent') {
                                                sharedDataFactory.agentTab = true;
                                                window.location.href = '#!/mydashboard';
                                            } else {
                                                window.location.href = '#!/' + createRedirect;
                                            }
                                        } else {
                                            $scope.hasProfile = true;
                                            $scope.createModeProfile = false;
                                            $scope.selectedCfgCitytown = $scope.profile.fkCfgCitytownId;
                                            setCfgCitytownId($scope.selectedCfgCitytown);

                                            if ($scope.profile.profilePicture) {
                                                $scope.addProfilePicture = false;
                                                $scope.removeProfilePic = true;
                                                $scope.profilePicture = $scope.profile.profilePicture;
                                            } else {
                                                $scope.addProfilePicture = true;
                                                $scope.removeProfilePic = false;
                                                $scope.profilePicture = null;
                                            }
                                        }
                                    } else {
                                        $scope.profile = {
                                            privacyLevel: 2
                                        };
                                    }
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
                    if (!sharedDataFactory.profileId && createRedirect) {
                        $scope.isCreateProfileMode = true;
                        $scope.isManageaccountCreateProfile = true;
                        $scope.isEditProfileMode = true;
                        $scope.hasProfile = true;
                        setTimeout(function() {
                            scrollTo('#urlId');
                        }, 1000);
                        toastr.info('Complete your registration to continue!');
                    } else if (sessionService.getProfileId()) {
                        $scope.hasProfile = true;
                        $scope.createModeProfile = false;
                    }

                    $scope.doneLoadingData = true;
                }

                function getCfgCitytownList() {
                    $scope.cityTownPlaceholder = 'Loading city or town list...';
                    if (sharedDataFactory.lstCfgCitytown) {
                        $scope.lstCfgCitytown = sharedDataFactory.lstCfgCitytown;
                        $scope.cityTownPlaceholder = 'Input Philippine city or town...';
                        $scope.isDoneLoadingCfgCitytown = true;
                    } else {
                        locationFactory.getAllCfgCitytown()
                                .success(function(citytownListResponse) {
                                    sharedDataFactory.lstCfgCitytown = citytownListResponse.lstCfgCitytown;
                                    $scope.lstCfgCitytown = citytownListResponse.lstCfgCitytown;
                                    $scope.cityTownPlaceholder = 'Input Philippine city or town...';
                                    $scope.isDoneLoadingCfgCitytown = true;
                                })
                                .error(function() {
                                    $scope.cityTownPlaceholder = 'Error loading city or town list!';
                                    toastr.error('Please email support', 'Server Error:');
                                });
                    }
                }

                function getBarangayList(selectedCfgCitytown) {
                    locationFactory.getBarangayByCityTownId(selectedCfgCitytown)
                            .success(function(barangayListResponse) {
                                console.log(barangayListResponse);
                                $scope.barangayList = barangayListResponse.lstCfgBarangay;
                                document.getElementById('barangay').value = '';
                                $scope.barangaySelectValue = 'Select your barangay...';
                                $scope.barangay = false;
                            })
                            .error(function() {
                                document.getElementById('barangay').value = '';
                                $scope.barangaySelectValue = 'Error loading barangay list!';
                                toastr.error('Please email support', 'Server Error');
                            });
                }

                function setDays(id) {
                    var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    if (!id) {
                        id = 1;
                    }
                    noOfDays = monthDays[id - 1];
                    loadLookups();
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

                    $scope.month = [
                        {id: 1, description: 'January'},
                        {id: 2, description: 'February'},
                        {id: 3, description: 'March'},
                        {id: 4, description: 'April'},
                        {id: 5, description: 'May'},
                        {id: 6, description: 'June'},
                        {id: 7, description: 'July'},
                        {id: 8, description: 'August'},
                        {id: 9, description: 'September'},
                        {id: 10, description: 'October'},
                        {id: 11, description: 'November'},
                        {id: 12, description: 'December'}
                    ];

                    $scope.accountStatus = [
                        {id: 0, description: 'Active account'},
                        {id: 1, description: 'Not available to provide service'},
                        {id: 2, description: 'Deactivate'}
                    ];
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
                        $('html, body').animate({scrollTop: destination}, 200);
                        setTimeout(function() {
                            $(targetId).focus();
                        }, 200);
                    }, 600);
                }

                /* google maps */

                function writeAddressName(latLng) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        "location": latLng
                    },
                    function(results, status) {
                        $('#showAddress').show();
                        $('#googleMapAddress').show();
                        if (status == google.maps.GeocoderStatus.OK) {
                            $('#showAddress').show();
                            $('#error').hide();
                            document.getElementById('address').innerHTML = results[0].formatted_address;
                            document.getElementById('googleMapAddress').value = results[0].formatted_address;
                            $scope.selectedAddress = document.getElementById('address').innerHTML;
                        } else {
                            $('#showAddress').hide();
                            $('#error').show();
                            document.getElementById('error').innerHTML = '';
                            document.getElementById('googleMapAddress').value = '';
                            document.getElementById("error").innerHTML += "Unable to retrieve your address";
                        }
                    });
                }

                function geolocationSuccess(position) {
                    if ($scope.googleMap) {
                        console.log($scope.googleMap);
                        var splitGoogleMap = $scope.googleMap.split(', ');
                        var userLatLng = new google.maps.LatLng(splitGoogleMap[0], splitGoogleMap[1]);
                    } else {
                        var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    }

                    writeAddressName(userLatLng);
                    console.log('google map first load');
                    console.log(userLatLng);
                    $scope.coordinates = userLatLng.lat() + ', ' + userLatLng.lng();
                    console.log(userLatLng.lat());
                    console.log(userLatLng.lng());

                    var myOptions = {
                        zoom: 16,
                        center: userLatLng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    // Draw the map
                    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

                    var singleMarker = new google.maps.Marker({
                        map: mapObject,
                        position: userLatLng,
                        animation: google.maps.Animation.DROP
                    });

                    google.maps.event.addListener(mapObject, 'click', function(event) {
                        if (singleMarker) {
                            singleMarker.setMap(null);
                        }

                        if (singleMarker.getAnimation() != null) {
                            singleMarker.setAnimation(null);
                        } else {
                            singleMarker.setAnimation(google.maps.Animation.BOUNCE);
                        }

                        userLatLng = event.latLng;
                        writeAddressName(userLatLng);
                        $scope.coordinates = userLatLng.lat() + ', ' + userLatLng.lng();
                        console.log('google map click event');
                        console.log(userLatLng.lat());
                        console.log(userLatLng.lng());

                        singleMarker = new google.maps.Marker({
                            position: userLatLng, //mouse click position
                            map: mapObject,
                            animation: google.maps.Animation.DROP
                        });
                    });

                    var input = /** @type {HTMLInputElement} */(
                            document.getElementById('googleMapAddress'));

                    var autocomplete = new google.maps.places.Autocomplete(input);
                    autocomplete.bindTo('bounds', mapObject);

                    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                        var place = autocomplete.getPlace();
                        if (!place.geometry) {
                            return;
                        }

                        if (singleMarker) {
                            singleMarker.setMap(null);
                        }

                        if (singleMarker.getAnimation() != null) {
                            singleMarker.setAnimation(null);
                        } else {
                            singleMarker.setAnimation(google.maps.Animation.BOUNCE);
                        }

                        if (place.geometry.viewport) {
                            mapObject.fitBounds(place.geometry.viewport);
                        } else {
                            mapObject.setCenter(place.geometry.location);
                            mapObject.setZoom(16);  // Why 17? Because it looks good.
                        }

                        userLatLng = place.geometry.location;
                        writeAddressName(userLatLng);
                        $scope.coordinates = userLatLng.lat() + ', ' + userLatLng.lng();
                        console.log('google map type event');
                        console.log(userLatLng.lat());
                        console.log(userLatLng.lng());

                        singleMarker = new google.maps.Marker({
                            position: userLatLng, //mouse click position
                            map: mapObject,
                            animation: google.maps.Animation.DROP
                        });
                    });
                }

                function geolocationError() {
                    setTimeout(function() {
                        $('#ajsjeeLocatorButton').click();
                    }, 500);
                    toastr.error('ajsjee locator not available!');
                }

                function setCfgCitytownId(citytown) {
                    console.log(citytown);
                    getBarangayList(citytown.pkCfgCitytownId);
                    $scope.cfgCitytownResponse = citytown;
                }

                $scope.setCfgCitytownId = function(citytown) {
                    setTimeout(function() {
                        if (!$scope.barangayList && $scope.barangaySelectValue != 'Error loading barangay list!' && !$scope.citytownBackspace) {
                            $scope.$apply(function() {
                                $scope.barangaySelectValue = 'Loading...';
                            });
                        }
                    }, 2000);
                    setCfgCitytownId(citytown);
                };

                $scope.backspacePressed = function(event) {
                    if (event.keyCode == 8) {
                        $scope.citytownBackspace = true;
                    } else {
                        $scope.citytownBackspace = false;
                    }
                };

                $scope.clearCfgCitytownId = function() {
                    $scope.barangay = true;
                    $scope.barangayList = '';
                    $scope.selCfgCitytownId = '';
                    document.getElementById('barangay').value = '';
                    $scope.barangaySelectValue = 'Select your barangay...';
                };

                $scope.setDayRange = function(id) {
                    setDays(id);
                };

                $scope.removeProfilePicture = function() {
                    $scope.addProfilePicture = true;
                    $scope.removeProfilePic = false;
                    $scope.profilePicture = null;
                    document.getElementById('profilePicture').src = '';
                };

                $scope.croppedImageResult = function() {
                    if ($scope.croppedImage) {
                        $scope.profilePicture = $scope.croppedImage;
                        $scope.addProfilePicture = false;
                        $scope.removeProfilePic = true;
                    }
                };

                $scope.setPictureFromOauthProvider = function() {
                    $scope.profilePicture = $scope.pictureFromOauthProvider;
                    $scope.addProfilePicture = false;
                    $scope.removeProfilePic = true;
                };

                $scope.clearFileInputField = function() {
                    document.getElementById('fileInput').value = '';
                    $scope.myImage = '';
                    $scope.croppedImage = '';
                };

                $scope.manageAccount = function() {
                    if (!$scope.saveClicked) {
                        $scope.saveClicked = true;
                        $scope.appuser.birthday = $scope.birthMonth + '/' + $scope.birthDay + '/' + $scope.birthYear;

                        // use this to get age
//                        var ageDifMs = sharedDataFactory.currentServerDate - $scope.appuser.birthday.getTime();
//                        var ageDate = new Date(ageDifMs);
//                        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
                        // end

                        console.log('manage account');
                        console.log($scope.appuser);
                        appuserFactory.updateAppuser(accessToken, loginId, $scope.appuser)
                                .success(function(createUdateResponse) {
                                    message = codeManagerFactory.getMessage(createUdateResponse.returnCode);
                                    if (codeManagerFactory.isSuccess(createUdateResponse.returnCode)) {
                                        sharedDataFactory.firstName = $scope.appuser.firstName;
//                                        $scope.isEditAccountMode = false;
                                        $scope.saveClicked = false;
                                        toastr.info(message);
                                    } else {
                                        if (message == 'Account email already used!') {
                                            scrollTo('#accountEmail');
                                        }
                                        $scope.saveClicked = false;
                                        toastr.error(message);
                                    }
                                })
                                .error(function() {
                                    $scope.saveClicked = false;
                                    toastr.error('Please email support', 'Server Error');
                                });
                    }
                };

                $scope.cancelEdit = function() {
                    $scope.confirmCancelEditMode();
                };

                $scope.editMode = function(edit) {
                    if (edit == 'editAccount') {
                        $scope.isEditAccountMode = true;
                        scrollTo('#scrollToAccount');
                    } else {
                        $scope.isEditProfileMode = true;
                        scrollTo('#scrollToProfile');
                    }
                };

                $scope.confirmCancelEditMode = function(edit) {
                    if (!$scope.cancelClicked) {
                        $scope.cancelClicked = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/views/dialog/confirmCancel.html',
                            controller: 'confirmDialogCtrl'
                        });
                        modalInstance.result.then(function(agree) {
                            if (agree) {
                                if (createRedirect) {
                                    if (createRedirect == 'agent') {
                                        sharedDataFactory.agentTab = true;
                                        window.location.href = '#!/mydashboard';
                                    } else {
                                        window.location.href = '#!/postad';
                                    }
                                } else {
                                    $route.reload();
                                }
                            }
                        }, function() {
                            $scope.cancelClicked = false;
                            console.log("Cancelled");
                        });
                    }
                };

                $scope.createProfileMode = function() {
                    $scope.hasProfile = true;
                    $scope.isEditProfileMode = true;
                    $scope.hasProfileStatus = true;
                    scrollTo('#scrollToProfile');
                };

                $scope.saveProfile = function() {
                    var barangay = document.querySelector('#barangay').value;
                    if (!barangay) {
                        scrollTo('#barangay');
                        toastr.error('Select your barangay first!');
                    } else {
                        if (!$scope.saveClicked) {
                            $scope.saveClicked = true;
                            if ($scope.landlineNumber) {
                                if ($scope.areaCode) {
                                    $scope.profile.landline = parseInt($scope.areaCode) + $('#landline').val();
                                } else {
                                    $scope.profile.landline = $('#landline').val();
                                }
                            } else {
                                $scope.profile.landline = null;
                            }
                            $scope.profile.googleMap = $scope.googleMap;
                            $scope.profile.profilePicture = $scope.profilePicture;
                            $scope.profile.fkAppuserId = $scope.appuser;
                            $scope.profile.fkCfgCitytownId = $scope.cfgCitytownResponse;
                            $scope.profile.fkCfgStateprovinceId = $scope.cfgCitytownResponse.fkCfgStateprovinceId;
                            if ($scope.createModeProfile) {
                                profileFactory.createProfile(accessToken, loginId, $scope.profile)
                                        .success(function(createUpdateResponse) {
                                            message = codeManagerFactory.getMessage(createUpdateResponse.returnCode);
                                            if (codeManagerFactory.isSuccess(createUpdateResponse.returnCode)) {
                                                sharedDataFactory.profileId = createUpdateResponse.lngId;
                                                sessionService.setProfileId(createUpdateResponse.lngId);
                                                toastr.info(message);
                                                if (createRedirect) {
                                                    if (createRedirect == 'company') {
                                                        window.location.href = '#!/registercompany';
                                                    } else if (createRedirect == 'service') {
                                                        if (sharedDataFactory.postad) {
                                                            window.location.href = '#!/' + sharedDataFactory.postad;
                                                        } else {
                                                            toastr.info("Select a category then the service you would like to provide.");
                                                            window.location.href = '#!/postad';
                                                        }
                                                    } else if (createRedirect == 'agent') {
                                                        sharedDataFactory.agentTab = true;
                                                        window.location.href = '#!/mydashboard';
                                                    }
                                                } else {
                                                    $scope.profile.pkProfileId = createUpdateResponse.lngId;
//                                                    $scope.isCreateProfileMode = true;
//                                                    $scope.createModeProfile = false;
//                                                    $scope.isEditProfileMode = false;
//                                                    $scope.isEditMode = false;
                                                }
                                            } else {
                                                if (message == 'URL ID already used!') {
                                                    scrollTo('#urlId');
                                                } else if (message == 'Mobile number already used!') {
                                                    scrollTo('#mobileNumber');
                                                } else if (message == 'Landline number already used!') {
                                                    scrollTo('#landline');
                                                } else if (message == 'Business email already used!') {
                                                    scrollTo('#businessEmail');
                                                }
                                                toastr.error(message);
                                            }
                                            $scope.saveClicked = false;
                                        })
                                        .error(function() {
                                            $scope.saveClicked = false;
                                            toastr.error('Please email support', 'Server Error');
                                        });
                            } else {
                                profileFactory.updateProfile(accessToken, loginId, $scope.profile)
                                        .success(function(createUpdateResponse) {
                                            console.log(createUpdateResponse);
                                            message = codeManagerFactory.getMessage(createUpdateResponse.returnCode);
                                            if (codeManagerFactory.isSuccess(createUpdateResponse.returnCode)) {
                                                toastr.info(message);
                                                if (createRedirect) {
                                                    if (createRedirect == 'company') {
                                                        window.location.href = '#!/registercompany';
                                                    } else if (createRedirect == 'service') {
                                                        if (sharedDataFactory.postad) {
                                                            window.location.href = '#!/' + sharedDataFactory.postad;
                                                        } else {
                                                            toastr.info("Select a category then the service you would like to provide.");
                                                            window.location.href = '#!/postad';
                                                        }
                                                    } else if (createRedirect == 'agent') {
                                                        sharedDataFactory.agentTab = true;
                                                        window.location.href = '#!/mydashboard';
                                                    }
                                                }
//                                                $scope.isCreateProfileMode = true;
//                                                $scope.isEditProfileMode = false;
//                                                $scope.isEditMode = false;
                                            } else {
                                                if (message == 'URL ID already used!') {
                                                    scrollTo('#urlId');
                                                } else if (message == 'Mobile number already used!') {
                                                    scrollTo('#mobileNumber');
                                                } else if (message == 'Landline number already used!') {
                                                    scrollTo('#landline');
                                                } else if (message == 'Business email already used!') {
                                                    scrollTo('#businessEmail');
                                                }
                                                toastr.error(message);
                                            }
                                            $scope.saveClicked = false;
                                        })
                                        .error(function() {
                                            $scope.saveClicked = false;
                                            toastr.error('Please email support', 'Server Error');
                                        });
                            }
                        }
                    }
                };

                $scope.cancelAccount = function() {
                    getAccountDetails();
                };

                $scope.cancelProfile = function() {
                    if (sessionService.getProfileId()) {
                        $scope.hasProfile = true;
                        getAccountDetails();
                    } else {
                        $scope.hasProfile = false;
                    }
                };

                $scope.getCoordinates = function() {
                    $scope.googleMap = $scope.coordinates;
                    $scope.googleMapsCoordinates = true;
                };

                $scope.geolocate = false;
                $scope.geolocateUser = function() {
                    if (navigator.geolocation) {
                        if (!$scope.geolocate) {
                            $('#showAddress').hide();
                            $('#googleMapAddress').hide();
                            $scope.geolocate = true;
                            var positionOptions = {
                                enableHighAccuracy: true,
                                timeout: 10 * 1000 // 10 seconds
                            };
                            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
                        } else if ($scope.selectedAddress) {
                            $scope.googleMapAddress = $scope.selectedAddress;
                        }
                    } else {
                        $('#showAddress').hide();
                        $('#error').show();
                        $('#googleMapAddress').hide();
                        document.getElementById('error').innerHTML = '';
                        document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
                    }
                };

                $scope.setPrivacyLevel = function() {
                    if ($scope.profile.privacyLevel == 1) {
                        if (!$scope.setPrivacyLevelClicked) {
                            $scope.setPrivacyLevelClicked = true;
                            var modalInstance = $modal.open({
                                templateUrl: 'app/views/dialog/privacyLevelChanged.html',
                                controller: 'confirmDialogCtrl'
                            });
                            modalInstance.result.then(function(agree) {
                                $scope.setPrivacyLevelClicked = false;
                            }, function() {
                                $scope.setPrivacyLevelClicked = false;
                                console.log("Cancelled");
                            });
                        }
                    }
                };

//                $scope.changedIdNo = function() {
//                    if ($('#idNo').val()) {
//                        $scope.idNoPattern = '/^(?:\d*\-)*\d+$/';
//                    } else {
//                        $scope.idNoPattern = '';
//                    }
//                };
            }]);