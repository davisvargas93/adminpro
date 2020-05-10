import { Component, OnInit } from '@angular/core';
import { medicoModal } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: medicoModal[]=[];
  totalReagistros: number=0 ;
  constructor(
    public _medicoServices:MedicoService
  ) { 
    this.cargarMedicos()
  }

  ngOnInit() {

  }
  cargarMedicos(){
    this._medicoServices.cargarMedicos()
      .subscribe(resp=>{
        this.medicos = resp;
        this.totalReagistros = this._medicoServices.totalReagistros;
      })
  }
  buscarMedico(termino:string){
    if (termino.length > 0){
    
      this._medicoServices.buscarMedicos(termino)
        .subscribe(medicos =>{
          this.medicos=medicos;
      })
    }else{
      this.cargarMedicos();
    }
  }
  crearMedico(){
    
  }
  actualizar( medico:medicoModal ){

  }
  borrarHospital( medico: medicoModal ){
    this._medicoServices.borrarMedico(medico._id)
      .subscribe(()=>{
        this.cargarMedicos();
      })
  }
  mostrarlModal(_id:string){

  }
}
