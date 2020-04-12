import { Component, OnInit } from '@angular/core';
import { usuarioModel } from '../../models/usuario.model';
import { UsuariosService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  usuario: usuarioModel;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer ;    
  constructor(public _servicioUsuario: UsuariosService ) {

    this.usuario = this._servicioUsuario.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: usuarioModel){

    console.log(usuario);

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google){

      this.usuario.email = usuario.email;
    }

    this._servicioUsuario.actualizarUsuario(this.usuario)
              .subscribe(resp =>{
                console.log(resp);
                
              })
  }
  seleccionImagen(archivo: File){
    
    if( !archivo){
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image')<0){
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;    

    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
    // reader.onloadend = () => {
    //   console.log(reader.result);
    // };
  }
  cambiarImagen(){
       this._servicioUsuario.cambiarImagne(this.imagenSubir, this.usuario._id)
  }

}
