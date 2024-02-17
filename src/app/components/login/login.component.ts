import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  credencials = {
    username: '',
    password: ''
  
  }

  login() {
    console.log('Email:', this.credencials.username);
    console.log('password:', this.credencials.password);

    this.auth.login(this.credencials).subscribe((response:any) => {
      console.log('Response:', response);
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/home']);
      }
    })
  }
}
