/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    IngredientFactory.$inject = ['MockStorage'];
    function IngredientFactory(Mock) {

        function IngredientService() {

        }

        Mock.seed('Ingredient', IngredientService);
        return Mock.buildEssentialService(IngredientService);
    }

    module.factory('Ingredient', IngredientFactory);

})(angular.module('pizdely.mobile.products'));