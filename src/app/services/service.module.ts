import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SharedService, SidebarService, UsuariosService, LoginGuard, SubirArchivoService } from './service.index';


@NgModule({
  declarations: [],
  providers:[
    SettingsService, 
    SharedService, 
    SidebarService,
    UsuariosService,
    LoginGuard,
    SubirArchivoService

  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
