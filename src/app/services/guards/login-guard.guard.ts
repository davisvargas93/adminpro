import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public _usuarioService:UsuariosService,
              public router: Router) {
    
  }
  canActivate(){

    if (this._usuarioService.estaLogeado()){
      // console.log('usuario valido');
      
      return true;
    }else{
      console.log('usuario no valido');
      this.router.navigate(['/login']  );
      return false;      
    }

  }
  
}
