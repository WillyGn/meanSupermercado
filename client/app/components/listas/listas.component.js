"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lista_service_1 = require("../../services/lista.service");
var ListasComponent = /** @class */ (function () {
    function ListasComponent(listaService) {
        var _this = this;
        this.listaService = listaService;
        //cargo listas desde el constructor
        this.listaService.getListas()
            .subscribe(function (listas) {
            _this.listas = listas;
        });
    }
    //obtener productos de un super
    ListasComponent.prototype.getProductos = function (supermercado, lista) {
        var _this = this;
        event.preventDefault();
        this.listaService.getProductos(supermercado)
            .subscribe(function (productos) {
            _this.productos = productos;
            _this.listaActual = lista;
        });
    };
    //obtener una lista y mostrar los productos que tiene
    ListasComponent.prototype.getLista = function (idlista) {
        var _this = this;
        event.preventDefault();
        this.listaService.getLista(idlista)
            .subscribe(function (lista) {
            _this.productosLista = [];
            _this.total = 0;
            _this.listaActual = lista;
            //Hago un objeto con la cantidad de repeticiones
            var obj = {};
            for (var i = 0, j = lista.productos.length; i < j; i++) {
                obj[lista.productos[i]] = (obj[lista.productos[i]] || 0) + 1;
            }
            var _loop_1 = function () {
                if (obj.hasOwnProperty(key)) {
                    var value_1 = obj[key];
                    _this.listaService.getProducto(key)
                        .subscribe(function (producto) {
                        producto.cantidad = value_1;
                        producto.precio = producto.precio * producto.cantidad;
                        _this.total += producto.precio;
                        _this.productosLista.push(producto);
                    });
                }
            };
            //Recorro el objeto para solo crear uno y con cantidades
            for (var key in obj) {
                _loop_1();
            }
        });
    };
    //Le seteo un producto a la lista de productos de la lista de compras
    ListasComponent.prototype.setProducto = function (lista, producto) {
        var prods = [""];
        prods.push(lista.productosDentro);
        var _lista = {
            _id: lista._id,
            nombre: lista.nombre,
            supermercado: lista.supermercado,
            producto: (producto._id)
        };
        this.listaService.setProducto(_lista).subscribe(function (data) {
            //no hago nada con la lista que devuelve xq lo tengo en el constructor
        });
    };
    //JAJA easy way
    ListasComponent.prototype.setWalmart = function () {
        this.supermercado = "Walmart";
    };
    ListasComponent.prototype.setPali = function () {
        this.supermercado = "Pali";
    };
    ListasComponent.prototype.setAmigazo = function () {
        this.supermercado = "El Amigazo";
    };
    //Agregar una lista con los atributos
    ListasComponent.prototype.addLista = function (event) {
        var _this = this;
        event.preventDefault();
        var newLista = {
            nombre: this.nombre,
            supermercado: this.supermercado,
            productos: []
        };
        this.listaService.addLista(newLista)
            .subscribe(function (lista) {
            _this.listas.push(lista);
            //limpio la interfaz
            _this.nombre = '';
            _this.supermercado = '';
        });
    };
    //borrar una lista
    ListasComponent.prototype.deleteLista = function (id) {
        var listas = this.listas;
        this.listaService.deleteLista(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < listas.length; i++) {
                    if (listas[i]._id == id) {
                        listas.splice(i, 1);
                    }
                }
            }
        });
    };
    ListasComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'listas',
            templateUrl: 'listas.component.html'
        }),
        __metadata("design:paramtypes", [lista_service_1.ListaService])
    ], ListasComponent);
    return ListasComponent;
}());
exports.ListasComponent = ListasComponent;
//# sourceMappingURL=listas.component.js.map