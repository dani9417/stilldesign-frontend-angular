import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }  from 'rxjs/operators'
import { Token } from '../login/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  postData = {
    grant_type: 'password',
    client_id: 2,
    client_secret: 'Admin_Production',
    username: '',
    password: ''
  }
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.postData = {...this.postData, username, password};
    console.log('login started')
    return this.getToken();
  }

  getToken() {
    return this.http.post('http://api.iss.stilldesign.work/oauth/token', this.postData)
  }
}
