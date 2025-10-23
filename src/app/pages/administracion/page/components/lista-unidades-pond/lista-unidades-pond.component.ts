import { Component, effect } from '@angular/core';
import { UnidadesPonderacionService } from './service/unidades-ponderacion-servicio.component';

@Component({
  selector: 'app-lista-unidades-pond',
  imports: [],
  templateUrl: `./lista-unidades-pond.component.html`,
})
export class ListaUnidadesPondComponent { 
  constructor(private unidadService: UnidadesPonderacionService) {
    // effect se ejecuta inmediatamente al crearse el componente
    effect(() => {
      this.unidadService.listadoUnidad();
console.log('listado '+this.unidadService.listadoUnidad());
    });
  
}}
