import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';
import { Transaccion } from '../../../core/models/transaccion.model';

@Component({
  selector: 'app-historial-transacciones',
  standalone: false,
  templateUrl: './historial-transacciones.html',
  styleUrl: './historial-transacciones.scss'
})
export class HistorialTransacciones implements OnInit {

  transacciones: Transaccion[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getTransacciones().subscribe((txs) => (this.transacciones = txs));
  }

  cancelar(tx: Transaccion): void {
    this.usuarioService.actualizarSaldo(tx.monto);

    this.usuarioService.registrarTransaccion({
      tipo: 'cancelacion',
      fondoId: tx.fondoId,
      fondoNombre: tx.fondoNombre,
      monto: tx.monto,
      fecha: new Date()
    });
  }


}
