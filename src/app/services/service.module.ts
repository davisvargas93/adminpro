import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SharedService, SidebarService, UsuariosService, LoginGuard } from './service.index';


@NgModule({
  declarations: [],
  providers:[
    SettingsService, 
    SharedService, 
    SidebarService,
    UsuariosService,
    LoginGuard

  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
