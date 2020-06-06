import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/service.index';
import { usuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  usuario : usuarioModel;

  constructor(  public _usuarioServices: UsuariosService,
                public router:Router  ) { }
  ngOnInit() {
    this.usuario =  this._usuarioServices.usuario ;
  }
  logout(){
    this._usuarioServices.logout();
  }
  buscar(termino:string){
    this.router.navigate(['/busqueda',termino]);
  }
  
}
