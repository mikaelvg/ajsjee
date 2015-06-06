'use strict';
angular.module('ajsjeeApp')
        .filter('setDecimal', function($filter) {
            return function(input, places) {
                if (isNaN(input))
                    return input;
                // If we want 1 decimal place, we want to mult/div by 10
                // If we want 2 decimal places, we want to mult/div by 100, etc
                // So use the following to create that factor
                var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
                return Math.round(input * factor) / factor;
            };
        })

        .filter('startFrom', function() {
            return function(input, start) {

                if (input == undefined || input == null || input.length == 0
                        || start == undefined || start == null || start.length == 0 || start == NaN)
                    return [];
                start = +start; //parse to int

                try {
                    var result = input.slice(start);
                    return result;

                } catch (e) {
                    //    alert(input);
                }
            };
        })
        .filter('trustAsResourceUrl', ['$sce', function($sce) {
                return function(val) {
                    return $sce.trustAsResourceUrl(val);
                };
            }]);