import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Unidad } from "../interfaces/unidad";
import { environment } from "src/environments/environment.development";


@Injectable({providedIn:'root'})
export class UnidadesPonderacionService {
    //private baseUrl = ${environment.basePro};
    private apiUrl = `${environment.apiUrl}`;
    private http=inject(HttpClient);
constructor() {}

listadoUnidad() {
        this.http.get<Unidad[]>(`${this.apiUrl}/cot/base/tiempo_unidad/api/permunidadcot/listaUnidadesBase/`,
            
        )
            .subscribe(resp=>{
      console.log('unidades desde servicio'+resp);
    });

    }

}