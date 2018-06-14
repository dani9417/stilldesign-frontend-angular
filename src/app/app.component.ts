import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn: boolean = !!localStorage.getItem('access_token')
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loginSource.subscribe(loginStatus => this.loggedIn = loginStatus);
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
