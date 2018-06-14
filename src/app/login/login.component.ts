import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Token } from './token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('inputEmail') email: ElementRef;
  @ViewChild('inputPassword') password: ElementRef;
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/users'])
    }
    
  }

  onSubmit() {
    const username = this.email.nativeElement.value;
    const password = this.password.nativeElement.value;
    this.authService.login(username, password)
    .subscribe((res: Token) => {
      localStorage.setItem('access_token', res.access_token);
      this.authService.loginStatus(true);
      this.router.navigate(['/users']);
    })
  }

}
