'use strict';
angular.module('ajsjeeApp')
        .controller('footerCtrl', ['$scope',
            function($scope) {

                var viewportWidth = $(window).width();
                var viewportHeight = $(window).height();

//                getFooter(3000, 100);

                $(window).resize(function() {
                    viewportWidth = $(window).width();
                    viewportHeight = $(window).height();
//                    getFooter(0, 0);
                });

                function getFooter(delay, speed) {
                    setTimeout(function() {
                        var footerHeight = $('footer .container').height();
                        if (viewportWidth > 991) {
                            $scope.isFooterVisible = $('footer').is(':visible');
                            if ($scope.isFooterVisible) {
                                var footerOffsetTop = $('#footer').offset().top;
                                var footerContainerOffsetTop = footerOffsetTop + footerHeight;
                                var footerViewportHeightDistance = viewportHeight - footerContainerOffsetTop;
                                if (viewportHeight > footerContainerOffsetTop) {
                                    var footerNewHeight = footerHeight + footerViewportHeightDistance;
                                    $('footer').animate({'height': footerNewHeight}, speed);
                                } else if (footerViewportHeightDistance <= 0) {
                                    $('footer').animate({'height': footerHeight + 30}, speed);
                                }
                            }
                        } else {
                            $('footer').animate({'height': footerHeight + 30}, 0);
                        }
                    }, delay);
                }
            }]);