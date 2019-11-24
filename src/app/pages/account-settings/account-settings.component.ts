import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(public _ajuste: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }
  CambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this._ajuste.aplicarTema(tema);

  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }
  
  colocarCheck(){
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajuste.ajustes.tema;
      for ( const ref of selectores) {
        if( ref.getAttribute('data-theme') ===  tema ){
          ref.classList.add('working');
          break;
        }
      }

  }

}
