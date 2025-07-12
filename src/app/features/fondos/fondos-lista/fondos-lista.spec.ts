import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FondosLista } from './fondos-lista';
import { FondosService } from '../../../core/services/fondos/fondos.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

describe('FondosLista', () => {
  let component: FondosLista;
  let fixture: ComponentFixture<FondosLista>;

  const mockFondos = [
    { id: 1, nombre: 'Fondo 1', montoMinimo: 100000, categoria: 'FPV' },
    { id: 2, nombre: 'Fondo 2', montoMinimo: 50000, categoria: 'FIC' }
  ];

  const mockService = {
    getFondos: () => of(mockFondos)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FondosLista],
      imports: [MatCardModule, MatTableModule],
      providers: [{ provide: FondosService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(FondosLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar la lista de fondos', () => {
    expect(component.fondos.length).toBe(2);
    expect(component.fondos[0].nombre).toBe('Fondo 1');
  });
});
