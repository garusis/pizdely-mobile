/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    ProductFactory.$inject = ['MockStorage'];
    function ProductFactory(Mock) {

        function ProductService() {

        }

        Mock.seed('Product', ProductService);
        return Mock.buildEssentialService(ProductService);
    }

    module.factory('Product', ProductFactory);

})(angular.module('pizdely.mobile.products'));