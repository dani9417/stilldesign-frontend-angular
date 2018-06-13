import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [{
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@gmail.com',
    phone: '0620000000',
    status: 2,
    createdAt: {date: '123', timezone_type: 2, timezone: 'asd'}
  }];

  constructor() { }

  ngOnInit() {
  }

}
