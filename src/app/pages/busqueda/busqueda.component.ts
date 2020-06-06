import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { usuarioModel } from '../../models/usuario.model';
import { hospitalModel } from '../../models/hospital.model';
import { medicoModal } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios:usuarioModel[]=[];
  hospitales:hospitalModel[]=[];
  medicos:medicoModal[]=[];
  constructor(
    public activatedRoute: ActivatedRoute,
    public http:HttpClient
  ) { 
    activatedRoute.params
      .subscribe(params => {
        let termino = params['termino'];

        this.busqueda(termino);
        
      })
  }

  ngOnInit() {
  }

  busqueda(termino: string){
    let url = URL_SERVICIOS + '/busqueda/todo/'+termino;

    this.http.get(url)
      .subscribe((resp:any) => {
        console.log(resp);
        
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
        
      })
  }

}
