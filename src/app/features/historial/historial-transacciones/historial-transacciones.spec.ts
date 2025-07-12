import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialTransacciones } from './historial-transacciones';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

describe('HistorialTransacciones', () => {
  let component: HistorialTransacciones;
  let fixture: ComponentFixture<HistorialTransacciones>;

  const mockService = {
    getTransacciones: () => of([
      { tipo: 'suscripcion', fondoId: 1, fondoNombre: 'Fondo A', monto: 100000, fecha: new Date() }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialTransacciones],
      imports: [MatCardModule, MatTableModule],
      providers: [{ provide: UsuarioService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialTransacciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar una transacción', () => {
    expect(component.transacciones.length).toBe(1);
    expect(component.transacciones[0].fondoNombre).toBe('Fondo A');
  });
});
