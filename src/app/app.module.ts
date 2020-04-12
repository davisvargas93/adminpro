import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
// Rutas
import { APP_RUTES } from './app-routing.module';
// Modules
import { PagesModule } from './pages/pages.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// services
import { ServiceModule } from './services/service.module';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    APP_RUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
