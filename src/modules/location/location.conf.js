;!(function (module) {

    $config.$inject = ['$stateProvider'];
    function $config($stateProvider) {
        $stateProvider
            .state('home.location', {
                url: 'location/',
                abstract : true,
                views: {
                    main : {
                        templateUrl: 'templates/location.index.html'
                    }
                }
            })
            .state('home.location.index', {
                url: 'catch/',
                controller: 'sasdsadsd',
                controllerAs:'LocationIndexCtrl',
                templateUrl: 'templates/location.index.html'
            });

    }

    module.config($config);
})(angular.module('pizdely.mobile.location', []));