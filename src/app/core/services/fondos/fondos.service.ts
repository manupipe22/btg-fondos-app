/*import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fondo } from '../../models/fondo.model';

@Injectable({
  providedIn: 'root'
})
export class FondosService {
  private fondos: Fondo[] = [
    { id: 1, nombre: 'FPV_BTG_PACTUAL_RECAUDADORA', montoMinimo: 75000, categoria: 'FPV' },
    { id: 2, nombre: 'FPV_BTG_PACTUAL_ECOPETROL', montoMinimo: 125000, categoria: 'FPV' },
    { id: 3, nombre: 'DEUDAPRIVADA', montoMinimo: 50000, categoria: 'FIC' },
    { id: 4, nombre: 'FDO-ACCIONES', montoMinimo: 250000, categoria: 'FIC' },
    { id: 5, nombre: 'FPV_BTG_PACTUAL_DINAMICA', montoMinimo: 100000, categoria: 'FPV' }
  ];

  getFondos(): Observable<Fondo[]> {
    return of(this.fondos);
  }
}*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Fondo } from '../../models/fondo.model';

@Injectable({ providedIn: 'root' })
export class FondosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getFondos(): Observable<Fondo[]> {
    return this.http.get<Fondo[]>(`${this.apiUrl}/fondos`);
  }
  
}
