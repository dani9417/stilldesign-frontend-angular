import { UserResponse } from "./../models/user-response";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { USERS_URL } from "./constants";

@Injectable({
  providedIn: "root"
})
export class UserService {
  access_token: string = null;
  config: {};

  constructor(private http: HttpClient) {
    this.access_token = sessionStorage.getItem("access_token");
    this.config = {
      headers: {
        Authorization: `Bearer ${this.access_token}`
      }
    };
  }

  getUsers(page: number = 1) {
    return this.http.get(`${USERS_URL}?page=${page}`, this.config);
  }

  getUser(id: number) {
    return this.http
      .get(`${USERS_URL}/${id}`, this.config)
      .pipe(map((res: { data }) => res.data));
  }

  updateUser({ id, ...user }) {
    return this.http
      .put(`${USERS_URL}/${id}`, user, this.config)
      .pipe(map((res: { data }) => res.data));
  }

  addUser(user: User) {
    return this.http
      .post(USERS_URL, user, this.config)
      .pipe(map((res: UserResponse) => res.data));
  }

  deleteUser(id: number) {
    return this.http.delete(`${USERS_URL}/${id}`, this.config);
  }
}
