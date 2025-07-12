import { TestBed } from '@angular/core/testing';
import { FondosService } from './fondos.service';
import { Fondo } from '../../models/fondo.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('FondosService', () => {
  let service: FondosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FondosService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(FondosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería retornar 5 fondos', (done) => {
    const mockFondos: Fondo[] = [
      { id: 1, nombre: 'Fondo 1', montoMinimo: 1000, categoria: 'FPV' },
      { id: 2, nombre: 'Fondo 2', montoMinimo: 2000, categoria: 'FPV' },
      { id: 3, nombre: 'Fondo 3', montoMinimo: 3000, categoria: 'FIC' },
      { id: 4, nombre: 'Fondo 4', montoMinimo: 4000, categoria: 'FIC' },
      { id: 5, nombre: 'Fondo 5', montoMinimo: 5000, categoria: 'FPV' },
    ];

    service.getFondos().subscribe((fondos) => {
      expect(fondos.length).toBe(5);
      expect(fondos).toEqual(mockFondos);
      done(); 
    });

    const req = httpMock.expectOne('http://localhost:3000/fondos');
    expect(req.request.method).toBe('GET');
    req.flush(mockFondos);
  });
});
