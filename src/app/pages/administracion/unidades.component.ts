import { Component, effect } from '@angular/core';
import { UnidadesPonderacionService } from './page/components/lista-unidades-pond/service/unidades-ponderacion-servicio.component';


@Component({
    selector: 'unidades',
    imports: [],
    templateUrl: './unidades.component.html',
    
})
export class UnidadesComponent {
    constructor(private unidadService: UnidadesPonderacionService) {
    // effect se ejecuta inmediatamente al crearse el componente
    effect(() => {
      this.unidadService.listadoUnidad();
console.log('listado '+this.unidadService.listadoUnidad());
    });
  }
}
