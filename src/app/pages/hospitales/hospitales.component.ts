import { Component, OnInit } from '@angular/core';
import { hospitalModel } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = true;

  hospitales: hospitalModel[]=[];
  totalReagistros:string;


  constructor(
    public _hospitalServices: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {
      this.cargarHospitales();
   }
   cargarHospitales(){
    this._hospitalServices.cargarHospitales()
      .subscribe((resp:any) =>{
        console.log(resp);
        this.totalReagistros=resp.total;
        this.hospitales = resp.hospitales;      
        this.cargando = false;
    })
   }

  ngOnInit() {
    this._modalUploadService.notificacion
      .subscribe(()=>{this.cargarHospitales()})
  }
  buscarHospital(termino: string){
    if (termino.length > 0 ) {
      
      this._hospitalServices.buscarHopital(termino)
      .subscribe((hospitales: hospitalModel[])=>{
        this.hospitales=hospitales;
      })
    }else{
      this.cargarHospitales();
    }
  }
  mostrarlModal(id:string){
    this._modalUploadService.mostrarModal('hospitales',id);
  }
  actualizar(hospital:hospitalModel  ){
    console.log(hospital);
    
    this._hospitalServices.actualizarHospital(hospital)
      .subscribe(resp=>{
        console.log(resp);
        
      })
  }
  borrarHospital( hospital:hospitalModel ){
    
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punt de borrar al hospital '+ hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        console.log(borrar);
        this._hospitalServices.borrarHospital(hospital._id)
        .subscribe(resp=>{
          console.log(resp);
          this.cargarHospitales();
            
        })
      } 
    });

  }

  crearHospital(){
    swal({
      text: 'Por favor ingresar el monbre del hospital',
      content: "input",
      button: {
        text: "crear",
        closeModal: false,
      },
    }).then(name => {
      if (!name) throw null;
      this._hospitalServices.crearHospital(name)
        .subscribe(()=>{
          this.cargarHospitales();
        });
    })

  }

}
