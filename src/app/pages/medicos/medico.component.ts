import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { hospitalModel } from '../../models/hospital.model';
import { HospitalService,MedicoService } from '../../services/service.index';
import { medicoModal } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: hospitalModel[]=[]; 
  medico: medicoModal = new medicoModal('','','','','');
  hospital: hospitalModel = new hospitalModel('');
  constructor(
    public _medicoServices:MedicoService,
    public _hopitalesServices:HospitalService,
    public router:Router,
    public activatedRuote:ActivatedRoute,
    public _modalUploadService:ModalUploadService
  ) { 
    activatedRuote.params.subscribe(params=>{
      let id = params['id'];

      if (id !== 'nuevo'){
        this.cargarMedico(id);
      }
    })
  }

  ngOnInit() {
    this._hopitalesServices.cargarHospitales()
      .subscribe((resp:any)=> {
        this.hospitales = resp.hospitales;
      });
      this._modalUploadService.notificacion
        .subscribe(resp => {
          this.medico.img = resp.medico.img;
          
        })
  }
  cargarMedico(id:string){

    this._medicoServices.cargarMedico(id)
      .subscribe(medico => {
        this.medico=medico,
        this.medico.hospital=medico.hospital._id,
        this.cambiarHospital(this.medico.hospital)
      })
  }
  guardarMedico(f:NgForm){
    console.log(f.valid);
    console.log(f.value);
    if (f.valid){
      this._medicoServices.guardarMedico(this.medico)
        .subscribe(medico=>{
          this.medico._id = medico._id;
          this.router.navigate(['/medico',medico._id])
          
        })
    }

  }
  cambiarHospital(id:string){

    console.log(id);
    this._hopitalesServices.obtenerHospital(id)
      .subscribe((resp:any) => {
       this.hospital = resp.hospital;
      })
  }
  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos',this.medico._id);
    
  }
}
