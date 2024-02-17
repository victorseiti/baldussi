import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

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
}
