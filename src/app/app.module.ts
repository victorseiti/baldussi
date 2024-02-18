import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from './core/authentication.service';
import { AdicionarUsuarioComponent } from './components/modal/adicionar-usuario/adicionar-usuario.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MensagensEnviadasComponent } from './components/modal/mensagens-enviadas/mensagens-enviadas.component';
import { LogsComponent } from './components/logs/logs.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UsersComponent,
    LoginComponent,
    DevicesEmpresaComponent,
    AdicionarUsuarioComponent,
    MensagensEnviadasComponent,
    LogsComponent
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
    InputTextModule,
    ConfirmPopupModule,
    DropdownModule

  ],
  providers: [
    ClientesService,
    AuthenticationService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
