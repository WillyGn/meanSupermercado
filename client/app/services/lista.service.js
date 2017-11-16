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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ListaService = /** @class */ (function () {
    function ListaService(http) {
        this.http = http;
        //console.log('Lista Service Initialized...');
    }
    ListaService.prototype.getListas = function () {
        return this.http.get('/api/listas')
            .map(function (res) { return res.json(); });
    };
    ListaService.prototype.getProductos = function (supermercado) {
        return this.http.get('/api/listaP/' + supermercado)
            .map(function (res) { return res.json(); });
    };
    ListaService.prototype.getProducto = function (id) {
        return this.http.get('/api/listas/' + id)
            .map(function (res) { return res.json(); });
    };
    ListaService.prototype.getLista = function (idlista) {
        return this.http.get('/api/lista/' + idlista)
            .map(function (res) { return res.json(); });
    };
    ListaService.prototype.setProducto = function (lista) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/listas/' + lista._id, JSON.stringify(lista), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ListaService.prototype.addLista = function (newLista) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/lista', JSON.stringify(newLista), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ListaService.prototype.deleteLista = function (id) {
        return this.http.delete('/api/lista/' + id)
            .map(function (res) { return res.json(); });
    };
    ListaService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ListaService);
    return ListaService;
}());
exports.ListaService = ListaService;
//# sourceMappingURL=lista.service.js.map