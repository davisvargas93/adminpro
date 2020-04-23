import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import {map} from 'rxjs/operators'
import  swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: usuarioModel;
  token: string;
  constructor(
    public _subirImagenServices:SubirArchivoService,
    public router:Router,
    public http: HttpClient,
    public _modalUploadService:ModalUploadService ) { 
    // console.log('servicio de usuario listo')
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

  actualizarUsuario(usuario: usuarioModel){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token='+this.token;

    return this.http.put(url, usuario)
            .pipe(map((resp:any) =>{
                  

              this.guardarStorage(resp.usuario._id,this.token,resp.usuario);
              swal('usuario actualizado', usuario.nombre, 'success' ) ;
              return true ; 
              
            }))
  }

  cambiarImagne(archivo : File , id:string){
    this._subirImagenServices.subirArchivo(archivo,'usuarios',id)
      .then((resp:any) =>{
        this.usuario.img = resp.usuario.img 
        this.guardarStorage(resp.usuario._id,this.token,this.usuario);
        swal('usuario actualizado', this.usuario.nombre, 'success' ) ;     
      })
      .catch(resp=>{
        console.log(resp);        
      })

  }

  cargarUsuarios(desde:number){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
        return this.http.get(url);
  }

  buscarUsuarios(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
          .pipe(map((resp:any)=>resp.usuarios ));
  }


  borrarUsuario(id:string){
    let url = URL_SERVICIOS + '/usuario/' + id+'?token='+this.token;

    return this.http.delete(url)
          .pipe(map(resp=>{
            swal('Usuario borrado','El usuario a sido eliminado correctamente','success');
            return true;

    }));
  }


}
