import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { Transaccion } from '../../models/transaccion.model';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });

  it('debería estar creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar con saldo de 500000', (done) => {
    service.getSaldo().subscribe(saldo => {
      expect(saldo).toBe(500000);
      done();
    });
  });

  it('debería actualizar el saldo correctamente', (done) => {
    service.actualizarSaldo(-100000);

    service.getSaldo().subscribe(saldo => {
      expect(saldo).toBe(400000);
      done();
    });
  });

  it('debería registrar una transacción', (done) => {
    const tx: Transaccion = {
      tipo: 'suscripcion',
      fondoId: 1,
      fondoNombre: 'Fondo Test',
      monto: 100000,
      fecha: new Date()
    };

    service.registrarTransaccion(tx);

    service.getTransacciones().subscribe(transacciones => {
      expect(transacciones.length).toBe(1);
      expect(transacciones[0].fondoId).toBe(1);
      done();
    });
  });
});
