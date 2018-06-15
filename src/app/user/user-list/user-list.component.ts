import { Pagination } from './../../models/user-response';
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUserName(user: User) {
    const { firstName, lastName } = user;
    if (!firstName && !lastName) return "Name not available";

    return `${firstName} ${lastName}`;
  }

  selectPage(page: number) {
    this.getUsers(page)
  }

  getUsers(page: number = 1) {
    this.userService.getUsers(page).subscribe(
      (userResponse: UserResponse) => {
        this.users = userResponse.data;
        this.pagination = userResponse.meta.pagination;
        this.pageNumbers = Array(this.pagination.totalPages).fill(null).map( (x,i) => i + 1 );
        console.log(this.pagination)
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }
      }
    );
  }
}
