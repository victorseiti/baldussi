import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from './core/clientes.service';
import { TableModule } from 'primeng/table';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { DevicesEmpresaComponent } from './components/modal/devices-empresa/devices-empresa.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from './core/authentication.service';
import { AdicionarUsuarioComponent } from './components/modal/adicionar-usuario/adicionar-usuario.component';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ClientesComponent,
    LoginComponent,
    DevicesEmpresaComponent,
    AdicionarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    AccordionModule,
    InputTextareaModule,
    ToastModule,
    InputTextModule

  ],
  providers: [
    ClientesService,
    AuthenticationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
