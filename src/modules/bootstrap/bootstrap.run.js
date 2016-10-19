/**
 * Created by garusis on 15/10/16.
 */
;!(function (module) {

    $run.$inject = ['$ionicPlatform', '$rootScope'];
    function $run($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function() {

        });
        jQuery.event.addProp('dataTransfer');
    }

    module
        .run($run);

})(angular.module('pizdely.mobile'));

