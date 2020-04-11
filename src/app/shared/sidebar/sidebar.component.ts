import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuariosService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public _usuarioServices:UsuariosService,
              public _sidebar: SidebarService) { }

  ngOnInit() {
  }

}
