import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import {map} from 'rxjs/operators'
import  swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: usuarioModel;
  token: string;
  constructor(public router:Router,
    public http: HttpClient ) { 
    console.log('servicio de usuario listo')
    this.cargarStorage();
  }

  cargarStorage(){
    if (localStorage.getItem('token')  ){
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }

  }

  estaLogeado(){
    return (this.token.length > 5 ) ? true : false 
  }

  guardarStorage(id: string, token: string, usuario: usuarioModel){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify (usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout(){
    this.usuario = null;
    this.token = '';
    
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string){
     let url = URL_SERVICIOS + '/login/google'

     return this.http.post(url, {token})
                   .pipe(map((resp:any)=>{
                    this.guardarStorage(resp.id,resp.token,resp.usuario);
                   }));
  }


  login(usuario: usuarioModel, recordar:boolean = false){
    
    if (recordar){
      localStorage.setItem('email',usuario.email)
    }else {
      localStorage.removeItem('email')
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
                .pipe(map((resp:any) =>{
                  // localStorage.setItem('id',resp.id);
                  // localStorage.setItem('token',resp.token);
                  // localStorage.setItem('usuario',JSON.stringify (resp.usuario));
                  this.guardarStorage(resp.id,resp.token,resp.usuario);
                  console.log(resp)
                  return true;

                }))
  }

  crearUsuario(usuario: usuarioModel){
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
              .pipe(map((resp:any) =>{

                swal('Usuario Creado', usuario.email, 'success');
                return resp.usuario;

              }));
  }
}
