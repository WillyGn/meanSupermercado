import { Component } from '@angular/core';
import {ListaService} from './services/lista.service';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [ListaService]
})

export class AppComponent { }

