import { Component, effect } from '@angular/core';
import { UnidadesPonderacionService } from './page/components/lista-unidades-pond/service/unidades-ponderacion-servicio.component';
import { ListaUnidadesPondComponent } from "./page/components/lista-unidades-pond/lista-unidades-pond.component";


@Component({
    selector: 'unidades',
    imports: [ListaUnidadesPondComponent],
    templateUrl: './unidades.component.html',
    
})
export class UnidadesComponent {
    
}
