import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.userService.getUser(+params.get('id')))
    )
    .subscribe((user: User) => this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      introduction: user.introduction,
      position: user.position,
      status: user.status
    }))
  }


  createForm() {
    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      introduction: '',
      position: '',
      status: ''
    });
  }

  onSubmit() {
    console.log(this.userForm.value)
  }

}
