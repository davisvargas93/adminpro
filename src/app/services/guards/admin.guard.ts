import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(public _usuarioServices:UsuariosService) {
  }

  canActivate(){

    if (this._usuarioServices.usuario.role === 'ADMIN_ROLE'){
    return true;
  }else{
    console.log('Bloqueado');    
    this._usuarioServices.logout();
    return false;
  }
  }
  
}
