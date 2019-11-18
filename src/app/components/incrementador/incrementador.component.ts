import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress', {static: false})txtProgress: ElementRef;
  @Input('name') leyenda: string = 'leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() {
    console.log ('leyenda' + this.leyenda);
    console.log ('progreso' + this.progreso);
  }
  ngOnInit() {
    console.log ('leyenda' + this.leyenda);
  }
  cambiarValor(valor) {
    if (this.progreso >= 100 && valor > 0 ) {
      console.log (this.progreso);
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      console.log (this.progreso);
      return;
    }
    console.log (this.progreso);
    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
  onChanges(valor: number) {
    // const elementHtml: any = document.getElementsByName('progreso')[0];
    // console.log(this.txtProgress);
    if (valor >= 100 ) {
      this.progreso = 100;
    } else if (valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    // elementHtml.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }
}


