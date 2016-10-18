/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    OrderController.$inject = ['$scope'];
    function OrderController($scope) {
        var orderCtrl = this;
        orderCtrl.view = {};

        $scope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.data)
                orderCtrl.view.title = toState.data.title;
        });
    }

    module.controller('OrderController', OrderController);

})(angular.module('pizdely.mobile.orders'));