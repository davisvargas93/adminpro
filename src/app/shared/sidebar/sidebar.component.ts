import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuariosService } from '../../services/service.index';
import { usuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  usuario: usuarioModel;
  constructor(public _usuarioServices:UsuariosService,
              public _sidebar: SidebarService) { }

  ngOnInit() {
    this.usuario = this._usuarioServices.usuario;
    this._sidebar.cargarMenu();
  }

}
