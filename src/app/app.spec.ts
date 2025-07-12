import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';
import { RouterOutlet } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [App], // ⬅️ Porque no es standalone
      imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterOutlet // ✅ Soluciona el error de 'router-outlet'
      ],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('debería crear el componente', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
