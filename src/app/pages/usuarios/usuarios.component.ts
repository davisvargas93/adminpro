import { Component, OnInit } from '@angular/core';
import { usuarioModel } from '../../models/usuario.model';
import { UsuariosService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  
  usuarios: usuarioModel[]=[];
  desde: number = 0;
  totalReagistros = 0;
  cargando: boolean = true;
  constructor(
    public _usuarioServices:UsuariosService,
    public _modalUploadService:ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this._usuarioServices.cargarUsuarios(this.desde)
            .subscribe((resp:any)=>{
              
              this.usuarios = resp.usuarios;
              this.totalReagistros = resp.total;
              this.cargando = false;
              
            })
  }

  cambiarDesde(valor:number){
    let desde = this.desde + valor;
    
    if(desde >= this.totalReagistros){
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios()
  }

  buscarUsuario(termino:string){
    
    if (termino.length <=0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioServices.buscarUsuarios(termino)
              .subscribe((usuarios:usuarioModel[]) =>{
                this.usuarios = usuarios;

                this.cargando = false;
              })
  }
  borrarUsuario( usuario:usuarioModel ){
    if( usuario._id === this._usuarioServices.usuario._id){
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo','error');
      return;

    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punt de borrar a '+ usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        console.log(borrar);
        this._usuarioServices.borrarUsuario(usuario._id)
                .subscribe(resp =>{
                  console.log(resp);   
                  this.cargarUsuarios();         
                })
      } 
    });
    

  }

  actualizar( usuario:usuarioModel ){

    this._usuarioServices.actualizarUsuario(usuario)
            .subscribe(resp=>{
              swal('El usuario se actualizo correctamente', 'Usuario actualizado','success');
            })
    
  }
  mostrarlModal( id: string){
    this._modalUploadService.mostrarModal('usuarios',id);
  }

}
