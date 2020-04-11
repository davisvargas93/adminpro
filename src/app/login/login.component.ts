import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../services/service.index';
import { usuarioModel } from '../models/usuario.model';


declare function init_plugins();
declare const gapi: any;  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  recuerdame: boolean = false;
    
  auth2: any ; 

  constructor(  public router: Router,
                public _usuarioServices: UsuariosService  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0 ){
      this.recuerdame = true;
    }

  }

  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '231218262578-jh383018huokab3j793a05e74dmr63vb.apps.googleusercontent.com', 
        cookiepolici: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'))
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) =>{
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioServices.loginGoogle(token)
                    .subscribe(()=> window.location.href ='#/dashboard');

      
    })
  }


  ingresar( forma: NgForm){
    // this.router.navigate(['/dashboard']);
    
    if (forma.invalid){
      return;
    }
    let usuario = new usuarioModel(null, forma.value.email, forma.value.password);
    console.log(usuario);
    this._usuarioServices.login(usuario, forma.value.recuerdame)
                      .subscribe(correcto => this.router.navigate(['/dashboard']));
    
  }

}
