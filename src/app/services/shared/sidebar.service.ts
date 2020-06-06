import { Injectable } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[]=[];
// menu:any = [
//   {
//     titulo:'Principal',
//     icono:'mdi mdi-gauge',
//     submenu:[
//       {titulo:'Dashboar', url: '/dashboard'},
//       {titulo:'Progress', url: '/progress'},
//       {titulo:'Graficas', url: '/graficas1'},
//       {titulo:'Promesas', url: '/promesas'},
//       {titulo:'rxjs', url: '/rxjs'}
//     ]
//   },
//   {
//     titulo:'Mantenimientos',
//     icono:'mdi mdi-folder-lock-open',
//     submenu:[
//       {titulo:'Usuarios',url:'/usuarios'},
//       {titulo:'Hospitales',url:'/hospitales'},
//       {titulo:'Medicos',url:'/medicos'}
//     ]
//   }
// ];
  constructor(
    public _usuarioService:UsuariosService
  ) { 
  }
  cargarMenu(){
    this.menu = this._usuarioService.menu; 
  }
}
