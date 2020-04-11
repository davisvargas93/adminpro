import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/service.index';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public _usuarioServices: UsuariosService) { }

  ngOnInit() {
  }
  logout(){
    this._usuarioServices.logout();
  }
  
}
