'use strict';
angular.module('ajsjeeApp')
        .controller('confirmDialogCtrl', ['$scope', '$modalInstance',
            function($scope, $modalInstance) {
                $scope.yes = function() {
                    $modalInstance.close(true);
                };
                $scope.no = function() {
                    $modalInstance.dismiss('cancel');
                };
            }
        ]); 

