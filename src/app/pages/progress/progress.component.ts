import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  sigPorcentaje: string = '%';
  progreso1: number = 30;
  progreso2: number = 20;
  constructor() { }

  ngOnInit() {
  }
  // cambiarValor(valor) {
  //   if (this.progreso >= 100 && valor > 0 ) {
  //     console.log (this.progreso);
  //     return;
  //   }
  //   if (this.progreso <= 0 && valor < 0) {
  //     console.log (this.progreso);
  //     return;
  //   }
  //   console.log (this.progreso);
  //   this.progreso = this.progreso + valor;
  // }
  // actualizar(evento: number) {
  //   console.log ('Evento: ', evento);
  // }

}
