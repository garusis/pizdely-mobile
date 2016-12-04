;!(function (module) {

    ObjLocation.$inject = ['$rootScope', '$q','$http','Config'];

    function ObjLocation($rootScope, $q,$http,Config) {


        var Position = function(lat, lon, address){
            this.lat = lat;
            this.lon = lon;
            this.address = address;

            var self = this;
            var urlApiGeocoding = "https://maps.googleapis.com/maps/api/geocode/json?";

            var geocodification = function(){

            };

            var inverseGeocodification = function(){
                var attrib = "latlng="+ this.lat + "," + this.lon;
                attrib += "&key=" + Config.apiKey;
                return $http.get(urlApiGeocoding + attrib);
            };

            this.fill = function(){
                var deferred = $q.defer();
                if(!this.address){
                    inverseGeocodification.apply(this)
                        .then(function(response){
                            var data = response.data;
                            if(data && data.results && data.status == "OK"){
                                self.address = data.results["0"].formatted_address;
                            }
                            deferred.resolve();
                        })
                        .catch(function(err){
                           deferred.reject(err);
                        });
                }

                return deferred.promise;
            };

            this.getData = function(){
                return {
                    lat :  self.lat,
                    lon : self.lon,
                    address : self.address
                }
            };
        };

        this.create = function(lat,lon,address){
            return new Position(lat,lon,address);
        };

        return this;
    }


    module.factory('ObjLocation', ObjLocation);
})(angular.module('pizdely.mobile.location'));