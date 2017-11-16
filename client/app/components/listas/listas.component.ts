import { Component } from '@angular/core';
import {ListaService} from '../../services/lista.service';
import {Lista} from '../../../Lista';
import {Producto} from '../../../Producto';

@Component({
  moduleId: module.id,
  selector: 'listas',
  templateUrl: 'listas.component.html'
})

export class ListasComponent { 
  listas: Lista[];
  productos: Producto[];
  productosLista: Producto[];
  nombre: string;
  listaActual: Lista;
  supermercado: string;
  total: number;

  constructor(private listaService:ListaService){
    //cargo listas desde el constructor
  	this.listaService.getListas()
  		.subscribe(listas => {
  			this.listas = listas;
  		});
  }

  //obtener productos de un super
  getProductos(supermercado, lista){
    event.preventDefault();
    this.listaService.getProductos(supermercado)
      .subscribe(productos => {
        this.productos = productos;
        this.listaActual = lista;
      });
  }

  //obtener una lista y mostrar los productos que tiene
  getLista(idlista){
    event.preventDefault();
    this.listaService.getLista(idlista)
      .subscribe(lista => {
        this.productosLista = [];
        this.total=0;
        this.listaActual = lista;
        //Hago un objeto con la cantidad de repeticiones
        var obj = { };
        for (var i = 0, j = lista.productos.length; i < j; i++) {
           obj[lista.productos[i]] = (obj[lista.productos[i]] || 0) + 1;
        }
        //Recorro el objeto para solo crear uno y con cantidades
        for( var key in obj) {
          if(obj.hasOwnProperty(key)) {
            const value = obj[key];
            this.listaService.getProducto(key)
            .subscribe(producto => {
              producto.cantidad=value;
              producto.precio=producto.precio * producto.cantidad;
              this.total+= producto.precio;
              this.productosLista.push(producto);
          });
          }
          
        }     
      });
  }



  //Le seteo un producto a la lista de productos de la lista de compras
  setProducto(lista, producto){
        var prods = [""]
        prods.push(lista.productosDentro);
        var _lista = {
            _id: lista._id,
            nombre: lista.nombre,
            supermercado: lista.supermercado,
            producto: (producto._id)
        };
        this.listaService.setProducto(_lista).subscribe(data => {
            //no hago nada con la lista que devuelve xq lo tengo en el constructor
        });
  }

  //JAJA easy way
  setWalmart(){
    this.supermercado="Walmart";
  }
  setPali(){
    this.supermercado="Pali";
  }
  setAmigazo(){
    this.supermercado="El Amigazo";
  }

  //Agregar una lista con los atributos
  addLista(event){
  	event.preventDefault();
  	var newLista = {
  		nombre: this.nombre,
  		supermercado: this.supermercado,
  		productos: []
  	}

  	this.listaService.addLista(newLista)
  		.subscribe(lista => {
  			this.listas.push(lista);
        //limpio la interfaz
  			this.nombre = '';
  			this.supermercado = '';
  		})
  }

  //borrar una lista
  deleteLista(id){
        var listas = this.listas;
        this.listaService.deleteLista(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < listas.length;i++){
                    if(listas[i]._id == id){
                        listas.splice(i, 1);
                    }
                }
            }
        });
    }

}