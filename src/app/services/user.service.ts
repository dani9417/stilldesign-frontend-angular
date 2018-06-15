import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, flatMap, switchMap } from "rxjs/operators";
import { User } from "../models/user";
import { UserResponse } from "../models/user-response";

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
    return this.http.get(
      `http://api.iss.stilldesign.work/admin/user?page=${page}`,
      this.config
    );
  }

  getUser(id: number) {
    return this.http
      .get(`http://api.iss.stilldesign.work/admin/user/${id}`, this.config)
      .pipe(map((res: { data }) => res.data));
  }

  updateUser(user: User) {
    return this.http
      .put(
        `http://api.iss.stilldesign.work/admin/user/${user.id}`,
        user,
        this.config
      )
      .pipe(map((res: { data }) => res.data));
  }

  addUser(user: User) {
    const config = {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        "Content-Type": "application/json"
      }
    };

    return this.http
      .post(
        "http://api.iss.stilldesign.work/admin/user",
        JSON.stringify(user),
        this.config
      )
      .pipe(map((res: { data }) => res.data));
  }

  deleteUser(id: number) {
    return this.http.delete(
      `http://api.iss.stilldesign.work/admin/user/${id}`,
      this.config
    );
  }
}
