import { AuthService } from "./../../services/auth.service";
import { Pagination } from "./../../models/user-response";
import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserResponse } from "../../models/user-response";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  pageNumbers: number[] = [];
  loading: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUserName(user: User) {
    const { firstName, lastName } = user;
    if (!firstName && !lastName) return "Name not available";

    return `${firstName} ${lastName}`;
  }

  selectPage(page: number) {
    this.getUsers(page);
  }

  getUsers(page: number = 1) {
    this.loading = true;
    this.userService.getUsers(page).subscribe(
      ({ data, meta }: UserResponse) => {
        this.loading = false;
        this.users = data;
        this.pagination = meta.pagination;
        this.pageNumbers = Array(this.pagination.totalPages)
          .fill(null)
          .map((x, i) => i + 1);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.authService.loginSource.next(false);
        this.router.navigate(["/login"]);
      }
    );
  }
}
