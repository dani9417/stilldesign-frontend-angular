import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AUTH_URL } from "./constants";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  postData = {
    grant_type: "password",
    client_id: 2,
    client_secret: "Admin_Production",
    username: "",
    password: ""
  };

  loginSource = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.postData = { ...this.postData, username, password };
    return this.getToken();
  }

  getToken() {
    return this.http.post(AUTH_URL, this.postData);
  }

  loginStatus(status: boolean) {
    this.loginSource.next(status);
  }
}
