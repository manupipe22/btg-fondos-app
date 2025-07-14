import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Fondo } from '../../../core/models/fondo.model';
import { FondosService } from '../../../core/services/fondos/fondos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-suscripcion-form',
  standalone: false,
  templateUrl: './suscripcion-form.html',
  styleUrl: './suscripcion-form.scss'
})
export class SuscripcionForm {
  fondos: Fondo[] = [];
  saldoUsuario = 0;
  cargando = false;

  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private fondosService: FondosService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      fondoId: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(0)]],
      notificacion: ['email', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fondosService.getFondos().subscribe((fondos) => (this.fondos = fondos));
    this.usuarioService.getSaldo().subscribe((s) => (this.saldoUsuario = s));
  }

  suscribir(): void {
    const fondoId = this.form.value.fondoId;
    const fondoSeleccionado = fondoId != null ? this.fondos.find(f => f.id === fondoId) : undefined;
    const monto = this.form.value.monto || 0;

    if (!fondoSeleccionado) return;

    if (monto < fondoSeleccionado.montoMinimo) {
      this.snackBar.open('El monto es menor al mínimo del fondo', 'Cerrar', { duration: 3000 });
      return;
    }

    if (monto > this.saldoUsuario) {
      this.snackBar.open('Saldo insuficiente', 'Cerrar', { duration: 3000 });
      return;
    }
    
    this.cargando = true;

    setTimeout(() => {
      this.usuarioService.actualizarSaldo(-monto);
      this.usuarioService.registrarTransaccion({
        tipo: 'suscripcion',
        fondoId: fondoSeleccionado.id,
        fondoNombre: fondoSeleccionado.nombre,
        monto,
        fecha: new Date()
      });

      this.snackBar.open(`Suscripción exitosa a ${fondoSeleccionado.nombre}`, 'OK', { duration: 3000 });
      this.form.reset({ notificacion: 'email' });
      this.cargando = false;
    }, 1000);
  }
}
