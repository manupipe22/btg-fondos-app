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
