/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    OrderFactory.$inject = ['MockStorage'];
    function OrderFactory(Mock) {
        function OrderService() {
        }
        return Mock.buildEssentialService(OrderService);
    }

    module.factory('Order', OrderFactory);

})(angular.module('pizdely.mobile.orders'));