;!(function (module) {

    locationService.$inject = ['$rootScope', '$q', 'ObjLocation'];

    function locationService($rootScope, $q, ObjLocation) {

        var createPositionObject = function (position,address) {

            var c = position.coords;
            return ObjLocation.create(c.latitude,c.longitude,address);
        };

        this.getLatLon = function(){
            var deferred = $q.defer();

            var address = _.filter(arguments,function(item){
               return _.isString(item);
            }).join("+");
            console.log("location.service.js:19 =",address);
            return deferred.promise;
        };


        this.getCurrentPosition = function () {
            var deferred = $q.defer();
            if ("geolocation" in navigator) {
                var options = {
                    enableHighAccuracy: true,
                    maximumAge: 30000
                };

                navigator.geolocation.getCurrentPosition(
                    function (coords) {
                        var position = createPositionObject(coords);
                        position.fill()
                            .then(function(){
                                deferred.resolve(position);
                            })
                            .catch(function(err){
                                deferred.reject(err);
                            });
                    },
                    function (err) {
                        deferred.reject(err);
                    },
                    options
                );

            } else {
                deferred.reject(
                    new Error("Navigator not support geolocation")
                );
            }

            return deferred.promise;
        };

        return this;
    }


    module.factory('LocationService', locationService);
})(angular.module('pizdely.mobile.location'));


