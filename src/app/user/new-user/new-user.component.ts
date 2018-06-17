import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit() { }

  createForm() {
    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      introduction: '',
      position: '',
      active: false
    });
  }

  onSubmit() {
    const { firstName, lastName, active, ...rest } = this.userForm.value;
    const newUser: User = {
      name: `${firstName} ${lastName}`,
      active: active ? 1 : 0,
      ...rest
    }
    console.log(newUser)

    this.userService.addUser(newUser)
      .subscribe(console.log, console.log)
  }

}
