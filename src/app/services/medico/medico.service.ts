import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuariosService } from '../usuarios/usuarios.service';
import  swal from 'sweetalert';
import { medicoModal } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalReagistros: number=0 ;
  constructor(
    public http:HttpClient,
    public _usuarioServices:UsuariosService
  ) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
      .pipe(map((resp:any)=>{
        this.totalReagistros = resp.total;
        return resp.medicos;
      }))
  }

  buscarMedicos(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
          .pipe(map((resp:any)=>resp.medicos ));
  }
  borrarMedico(_id:string){
    let url = URL_SERVICIOS + '/medico/' + _id + '?token=' + this._usuarioServices.token
    return this.http.delete(url)
      .pipe(map((resp:any)=>{
      swal('Medico borrado','El medico a sido eliminado correctamente','success');
      return true;
    }))
  }

  guardarMedico(medico:medicoModal){
    let url = URL_SERVICIOS + '/medico'

    if(medico._id){
      // Crear
      url += '/'+medico._id;
      url += '?token=' + this._usuarioServices.token;
      return this.http.put(url,medico)
        .pipe(map((resp:any)=>{
          swal('Médico Actualizado',medico.nombre,'success');
          return resp.medico;
        }))
    }else {
      // Actualizar
      url += '?token=' + this._usuarioServices.token
      return this.http.post(url,medico)
        .pipe(map((resp:any)=>{
          swal('Médico Creado',medico.nombre,'success');
          return resp.medico;
        }))
    }
  }
  cargarMedico(id: string){
    let url = URL_SERVICIOS + '/medico/'+id;

    return this.http.get(url)
      .pipe(map((resp:any)=>{
        return resp.medico
      }))
  }

}
