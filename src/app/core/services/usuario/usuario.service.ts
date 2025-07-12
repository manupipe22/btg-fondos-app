import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaccion } from '../../models/transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private saldoInicial = 500000;
  private saldo$ = new BehaviorSubject<number>(this.saldoInicial);
  private transacciones$ = new BehaviorSubject<Transaccion[]>([]);

  getSaldo() {
    return this.saldo$.asObservable();
  }

  getTransacciones() {
    return this.transacciones$.asObservable();
  }

  actualizarSaldo(monto: number) {
    const nuevoSaldo = this.saldo$.value + monto;
    this.saldo$.next(nuevoSaldo);
  }

  registrarTransaccion(tx: Transaccion) {
    const actuales = this.transacciones$.value;
    this.transacciones$.next([...actuales, tx]);
  }
}
