import { Component, OnInit } from '@angular/core';
import { User } from './../user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  user: User = null;

  constructor() { }

  ngOnInit() {
  }

}
