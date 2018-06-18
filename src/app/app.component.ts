import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn: boolean = !!sessionStorage.getItem('access_token')
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loginSource.subscribe(loginStatus => {
      this.loggedIn = loginStatus;
      if (!loginStatus) {
        this.logout();
      }
    });
  }

  logout() {
    this.loggedIn = false;
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
