;!(function (module) {

    $config.$inject = ['$stateProvider'];
    function $config($stateProvider) {
        $stateProvider
            .state('home.location', {
                url: 'location/',
                abstract : true,
                views: {
                    'main' : {
                        templateUrl: 'templates/location.html'
                    }
                }
            })
            .state('home.location.index', {
                url: 'catch/',
                templateUrl: 'templates/location.index.html',
                controller: 'LocationIndexController',
                controllerAs:'locationIndexCtrl'
            });

    }

    module.config($config);
})(angular.module('pizdely.mobile.location', []));