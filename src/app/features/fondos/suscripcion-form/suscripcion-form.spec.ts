import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuscripcionForm } from './suscripcion-form';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { FondosService } from '../../../core/services/fondos/fondos.service';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


describe('SuscripcionForm', () => {
  let component: SuscripcionForm;
  let fixture: ComponentFixture<SuscripcionForm>;

  const mockFondosService = {
    getFondos: () => of([
      { id: 1, nombre: 'Test Fondo', montoMinimo: 100000, categoria: 'FPV' }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuscripcionForm],
      imports: [ReactiveFormsModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatInputModule],
      providers: [
        { provide: FondosService, useValue: mockFondosService },
        UsuarioService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuscripcionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el formulario inválido si está vacío', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('debería hacer válido el formulario con datos válidos', () => {
    component.form.setValue({
      fondoId: 1,
      monto: 150000,
      notificacion: 'email'
    });
    expect(component.form.valid).toBeTrue();
  });

  it('debería mostrar error si monto es menor al mínimo del fondo', () => {
  component.fondos = [{ id: 1, nombre: 'Fondo Test', montoMinimo: 100000, categoria: 'FPV' }];
  component.form.setValue({
    fondoId: 1,
    monto: 50000,
    notificacion: 'email'
  });
  spyOn(component['snackBar'], 'open');
  component.suscribir();
  expect(component['snackBar'].open).toHaveBeenCalledWith(
    'El monto es menor al mínimo del fondo',
    'Cerrar',
    { duration: 3000 }
  );
});
});
