import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { LogsComponent } from './components/logs/logs.component';
import { MensagensComponent } from './components/mensagens/mensagens.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    component: UsersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }
  ,{
    path: 'logs',
    component: LogsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'mensagens-enviadas',
    component: MensagensComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
