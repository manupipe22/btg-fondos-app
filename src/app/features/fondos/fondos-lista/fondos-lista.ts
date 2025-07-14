import { Component } from '@angular/core';
import { FondosService } from '../../../core/services/fondos/fondos.service';
import { Fondo } from '../../../core/models/fondo.model';

@Component({
  selector: 'app-fondos-lista',
  standalone: false,
  templateUrl: './fondos-lista.html',
  styleUrl: './fondos-lista.scss'
})
export class FondosLista {

  fondos: Fondo[] = [];

  constructor(private fondosService: FondosService) {}

  ngOnInit(): void {
    this.fondosService.getFondos().subscribe((data) => (this.fondos = data));
  }

}
