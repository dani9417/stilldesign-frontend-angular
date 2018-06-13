import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@gmail.com',
    phone: '0620000000',
    introduction: 'text',
    position: 'position',
    status: 2,
    avatar: {file: 'file', src: 'http://via.placeholder.com/350x150'},
    roles: [{id: 1, name: 'role'}],
    createdAt: {date: '123', timezone_type: 2, timezone: 'asd'}
  };

  constructor() { }

  ngOnInit() {
  }

}
