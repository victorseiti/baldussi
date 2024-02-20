import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private message: MessageService) {}

  credencials = {
    username: '',
    password: ''

  }

  entrando = false;

  ngOnInit() {
    document.addEventListener('keydown', (e:any) => {
      if (e.key === 'Enter') {
        let input = document.getElementById('entrar') as HTMLElement;
        input.click();
      }

    })
  }

  login() {
    this.entrando = true;
    this.auth.login(this.credencials).subscribe((response:any) => {
      if (response.access_token) {
        localStorage.removeItem('token')
        localStorage.setItem('token', response.access_token);
        this.entrando = false;
        this.router.navigate(['/home']);
      }
    }, (error) => {
      this.message.add( {severity:'error', summary:'Erro', detail:'Usuário ou senha inválidos'})
      this.entrando = false;
    }
    )
  }
}
