'use strict';

angular.module('ajsjeeApp', [
            'ipCookie',
            'ngRoute',
            'ui.bootstrap',
            'ui',
            'ngImgCrop',
            'ngMap',
            'seo'
        ])

        .config(function ($routeProvider, $locationProvider) {

            hello.init({
                facebook: CLIENT_IDS_ALL.facebook,
                google: CLIENT_IDS_ALL.google,
                twitter: CLIENT_IDS_ALL.twitter,
                linkedin: CLIENT_IDS_ALL.linkedin,
                yahoo: CLIENT_IDS_ALL.yahoo
            }, {
//                redirect_uri: "http://" + window.location.hostname,
                oauth_proxy: OAUTH_PROXY_URL,
                scope: "email,friends,user_birthday"
            });

            $routeProvider
                    .when('/', {
                        templateUrl: 'app/views/home.html',
                        controller: 'homeCtrl'
                    })
                    .when('/login', {
                        templateUrl: 'app/views/register.html',
                        controller: 'loginCtrl'
                    })
                    .when('/register/:registermethod', {
                        templateUrl: 'app/views/register.html',
                        controller: 'loginCtrl'
                    })
                    .when('/multilogin', {
                        templateUrl: 'app/views/multilogin.html',
                        controller: 'multiloginCtrl'
                    })
                    .when('/currentlylogin/:currentoauthprovider/newloginaccount/:newoauthprovider', {
                        templateUrl: 'app/views/multilogin.html',
                        controller: 'multiloginCtrl'
                    })
                    .when('/createprofile/:createredirect', {
                        templateUrl: 'app/views/settings.html',
                        controller: 'settingsCtrl'
                    })
                    .when('/mydashboard', {
                        templateUrl: 'app/views/viewprofile.html',
                        controller: 'viewProfileCtrl'
                    })
                    .when('/mydashboard/:selectedtab', {
                        templateUrl: 'app/views/viewprofile.html',
                        controller: 'viewProfileCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });

            $locationProvider.hashPrefix('!');
        });
