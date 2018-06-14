import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  access_token: string = null;
  constructor(private http: HttpClient) { 
    this.access_token = localStorage.getItem('access_token') || '';
  }


  getUsers() {
    this.access_token = localStorage.getItem('access_token') || '';
    const config = {
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      }
    }
    return this.http.get('http://api.iss.stilldesign.work/admin/user',config )
      .pipe(map((res: { data }) => res.data))
  }

  getUser(id: number) {
    const config = {
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      }
    }
    return this.http.get(`http://api.iss.stilldesign.work/admin/user/${id}`,config )
      .pipe(map((res: { data }) => res.data))
  }

  updateUser(user: User) {
    const config = {
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      }
    }
    // console.log(user)

    return this.http.put(`http://api.iss.stilldesign.work/admin/user/${user.id}`,user, config)
  }

  

}
