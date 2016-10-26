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
                image: 'assets/images/cheese.png',
                price:1500
            },
            pinha: {
                id: 2,
                name: 'Piña',
                image: 'assets/images/pineapple.png',
                price:1000
            },
            pollo: {
                id: 3,
                name: 'Pollo',
                image: 'assets/images/chicken.png',
                price:1000
            },
            atun: {
                id: 4,
                name: 'Atun',
                image: 'assets/images/fish.png',
                price:2500
            },
            pimienta: {
                id: 5,
                name: 'Chile',
                image: 'assets/images/pepper.png',
                price:1000
            },
            carne: {
                id: 6,
                name: 'Carne',
                image: 'assets/images/steak.png',
                price:2000
            }
        };
        mockData.push({collection: 'Ingredient', data: _.values(ingredients)});

        var products = [
            {
                id: 1,
                name: 'Hawaiana',
                description: 'Piña, Jamón',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 30000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pinha.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza6.png'
            },
            {
                id: 2,
                name: 'Caesar',
                description: 'Pollo, Lechuga, Champiñones, Pimentón, Aceitunas',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 35000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pollo.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza1.png'
            },
            {
                id: 3,
                name: 'Campesina',
                description: 'Chorizo, Tocineta, Maíz, Hogao',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 25000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.atun.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza7.png'
            },
            {
                id: 4,
                name: 'San Siro',
                description: 'Pollo, Jamón, Champiñones',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 35000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.carne.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza2.png'
            },
            {
                id: 5,
                name: 'Tres Carnes',
                description: 'Carne, Pollo, Tocineta',
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
                img: 'assets/images/Pizza9.png'
            },
            {
                id: 6,
                name: 'Thai',
                description: 'Pollo, Tocineta, Verduras sofritas, Salsa Teriyaki',
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
                img: 'assets/images/Pizza5.png'
            },
            {
                id: 7,
                name: 'Bechamel',
                description: 'Pollo, Champiñones, Salsa Bechamel',
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
                img: 'assets/images/Pizza8.png'
            },
            {
                id: 8,
                name: 'Marinera',
                description: 'Atún, Camarones, Palomitos, Salsa Casa',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 25000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pollo.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.carne.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza4.png'
            },
            {
                id: 9,
                name: 'Napolitana',
                description: 'Clásica tomate y orégano',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 25000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.carne.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.atun.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza3.png'
            }
        ];
        mockData.push({collection: 'Product', data: products});

        var shops = [
            {
                id: 1,
                name: 'Gambeta Pizza Club',
                stars: 3,
                img: 'assets/images/Pizza6.png'
            },
            {
                id: 2,
                name: 'Caesar',
                description: 'Pollo, Lechuga, Champiñones, Pimentón, Aceitunas',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 35000sdfsddsfdsfsdfs
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.pollo.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza1.png'
            },
            {
                id: 3,
                name: 'Campesina',
                description: 'Chorizo, Tocineta, Maíz, Hogao',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 25000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.atun.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza7.png'
            },
            {
                id: 4,
                name: 'San Siro',
                description: 'Pollo, Jamón, Champiñones',
                basePrice: {
                    sm: 10000,
                    m: 15000,
                    l: 35000
                },
                additionals: [
                    {id: ingredients.queso.id, qty: {all:1, left:0, right:0}},
                    {id: ingredients.carne.id, qty: {all:1, left:0, right:0}}
                ],
                img: 'assets/images/Pizza2.png'
            },
            {
                id: 5,
                name: 'Tres Carnes',
                description: 'Carne, Pollo, Tocineta',
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
                img: 'assets/images/Pizza9.png'
            }
        ];
        mockData.push({collection: 'Shop', data: shops});

        return new MockService();
    }

    module.factory('MockStorage', MockFactory);

})(angular.module('pizdely.mobile.mock'));