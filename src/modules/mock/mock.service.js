/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    MockFactory.$inject = ['$q', '$timeout'];
    function MockFactory($q, $timeout) {
        var mockData = [];

        var getCollection = function (from) {
            var collection = _.find(mockData, {collection: from});
            if (!collection) {
                collection = {collection: from, data: []};
                mockData.push(collection);
            }
            return collection;
        };


        function MockService() {
        }

        MockService.prototype.sendData = function (data, isReject) {
            return $q(function (resolve, reject) {
                $timeout(function () {
                    isReject ? reject(data) : resolve(data);
                });
            });
        };


        MockService.prototype.create = function (from, data) {
            var collection = getCollection(from).data;

            data = _.cloneDeep(data);
            data.id = collection.length + 1;

            collection.push(data);
            return this.sendData(data);
        };

        MockService.prototype.get = function (from, where) {
            var collection = getCollection(from).data;
            var data = _.find(collection, where);
            return this.sendData(_.cloneDeep(data));
        };

        MockService.prototype.list = function (from, filter) {
            var data = getCollection(from).data;
            if (!filter) {
                data = _.filter(data, filter);
            }
            return this.sendData(_.cloneDeep(data));
        };

        MockService.prototype.update = function (from, where, data) {
            var collection = getCollection(from).data;
            var existingElem = _.find(collection, where);
            if (!existingElem) {
                return this.sendData({message: 'Item not exists', statusCode: 404}, true);
            }
            _.assign(existingElem, data);

            return this.sendData(_.cloneDeep(existingElem));
        };

        MockService.prototype.seed = function (seedName, Service) {
            var existingCollection = getCollection(seedName);
            existingCollection.collection = Service;
        };

        MockService.prototype.buildEssentialService = function (Service) {
            var Mock = this;

            Service.prototype.create = function (data) {
                return Mock.create(Service, data);
            };

            Service.prototype.get = function (where) {
                return Mock.get(Service, where);
            };

            Service.prototype.list = function (where) {
                return Mock.list(Service, where);
            };

            Service.prototype.update = function (where, data) {
                return Mock.update(Service, where, data);
            };

            Service.prototype.findByIds = function (ids) {
                var promises = _.map(ids, function (id) {
                    return Mock.get(Service, {id: id});
                });
                return $q.all(promises);
            };

            return new Service();
        };

        var ingredients = {
            queso: {
                id: 1,
                name: 'Queso',
                image: 'assets/images/cheese.png'
            },
            pinha: {
                id: 2,
                name: 'Piña',
                image: 'assets/images/pineapple.png'
            },
            pollo: {
                id: 3,
                name: 'Pollo',
                image: 'assets/images/chicken.png'
            },
            atun: {
                id: 4,
                name: 'Atun',
                image: 'assets/images/fish.png'
            },
            pimienta: {
                id: 5,
                name: 'Pimienta',
                image: 'assets/images/pepper.png'
            },
            carne: {
                id: 6,
                name: 'Carne',
                image: 'assets/images/steak.png'
            }
        };
        mockData.push({collection: 'Ingredient', data: _.values(ingredients)});

        var products = [
            {
                id: 1,
                name: 'Pizza 1',
                description: 'Queso + Piña',
                basePrice: {
                    sm: 20000,
                    m: 30000,
                    l: 50000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pinha.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 2,
                name: 'Pizza 2',
                description: 'Queso + Pollo',
                basePrice: {
                    sm: 21000,
                    m: 31000,
                    l: 51000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pollo.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 3,
                name: 'Pizza 3',
                description: 'Queso + Atun',
                basePrice: {
                    sm: 22000,
                    m: 32000,
                    l: 52000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.atun.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 4,
                name: 'Pizza 4',
                description: 'Queso + Carne',
                basePrice: {
                    sm: 23000,
                    m: 33000,
                    l: 53000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.carne.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 5,
                name: 'Pizza 5',
                description: 'Queso + Pollo + Piña',
                basePrice: {
                    sm: 24000,
                    m: 34000,
                    l: 54000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pollo.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pinha.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 6,
                name: 'Pizza 6',
                description: 'Queso + Pollo + Atun',
                basePrice: {
                    sm: 25000,
                    m: 35000,
                    l: 55000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pollo.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.atun.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 7,
                name: 'Pizza 7',
                description: 'Queso + Pollo + Pimienta',
                basePrice: {
                    sm: 26000,
                    m: 36000,
                    l: 56000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pollo.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pimienta.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 8,
                name: 'Pizza 8',
                description: 'Queso + Pollo + Carne',
                basePrice: {
                    sm: 27000,
                    m: 37000,
                    l: 57000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pollo.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.carne.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 9,
                name: 'Pizza 9',
                description: 'Queso + Carne + Atun',
                basePrice: {
                    sm: 28000,
                    m: 38000,
                    l: 58000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.carne.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.atun.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            },
            {
                id: 10,
                name: 'Pizza 10',
                description: 'Queso + Carne + Pimienta',
                basePrice: {
                    sm: 29000,
                    m: 39000,
                    l: 59000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.carne.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pimienta.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/pizza.png'
            }
        ];
        mockData.push({collection: 'Product', data: products});


        return new MockService();
    }

    module.factory('MockStorage', MockFactory);

})(angular.module('pizdely.mobile.mock'));