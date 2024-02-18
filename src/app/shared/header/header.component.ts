import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  currentRoute:any

  ngOnInit(): void {
    this.getPath();
  }
  
  getPath() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.currentRoute = url;
      }
    })
  }

  logout() {
    this.auth.logout().subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
  }
}
