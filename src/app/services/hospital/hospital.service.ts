import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../usuarios/usuarios.service';
import { map } from 'rxjs/operators';
import  swal from 'sweetalert';
import { hospitalModel } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  
  constructor( 
    public _usuarioService:UsuariosService,
    public http: HttpClient) { }
    
    crearHospital(	nombre:	string	){
      console.log(nombre);
      let body: any={
        nombre: nombre,
        usuario:this._usuarioService.usuario
      };
      let url = URL_SERVICIOS + '/hospital?token='+this._usuarioService.token;
      return this.http.post(url,body)
          .pipe(map((resp:any)=>{
            swal('Hospital Creado', nombre, 'success');
                return resp.hospital;
          }))
    }
  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital';
    
    return this.http.get(url);
  }

  obtenerHospital(	id:	string ){
    let url = URL_SERVICIOS + '/hospital/'+id;
    return this.http.get(url);
  }

  buscarHopital(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
          .pipe(map((resp:any)=>resp.hospitales ));
  }

  actualizarHospital(	hospital:	hospitalModel	){
    let url = URL_SERVICIOS + '/hospital/'+hospital._id+'?token='+this._usuarioService.token;
    return this.http.put(url,hospital)
          .pipe(map(resp=>{
            console.log(resp);
            
            swal('Hospital actualizado', hospital.nombre, 'success' ) ;
            return true ; 
          }))
  }
  borrarHospital(	id:	string	){
    let url = URL_SERVICIOS + '/hospital/'+id+'?token='+this._usuarioService.token;
    return this.http.delete(url)
          .pipe(map(res=>{
            swal('Hospital borrado','El hospital a sido eliminado correctamente','success');
            return true;
          }));
  }

}
