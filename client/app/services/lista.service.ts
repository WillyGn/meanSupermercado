import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListaService{
    constructor(private http:Http){
        //console.log('Lista Service Initialized...');
    }
    
    getListas(){
        return this.http.get('/api/listas')
            .map(res => res.json());
    }
    getProductos(supermercado){
        return this.http.get('/api/listaP/'+supermercado)
            .map(res => res.json());
    }

    getProducto(id){
        return this.http.get('/api/listas/'+id)
            .map(res => res.json());
    }

    getLista(idlista){
        return this.http.get('/api/lista/'+idlista)
            .map(res => res.json());
    }

    setProducto(lista){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/listas/'+lista._id, JSON.stringify(lista), {headers: headers})
            .map(res => res.json());
    }

    addLista(newLista){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/lista', JSON.stringify(newLista), {headers: headers})
            .map(res => res.json());
    }
    
    deleteLista(id){
        return this.http.delete('/api/lista/'+id)
            .map(res => res.json());
    }
}