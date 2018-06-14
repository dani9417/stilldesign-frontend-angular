import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(
    (users: User[]) => {
      this.users = users;
      // console.log(JSON.stringify(users))
    },
    (error: HttpErrorResponse) => {
      if(error.status === 401) {
        this.router.navigate(['/login'])
      }
    })
  }


  getUserName(user: User) {
    const { firstName, lastName } = user;
    if (!firstName && !lastName) return 'Name not available';

    return `${firstName} ${lastName}`
  }

}
