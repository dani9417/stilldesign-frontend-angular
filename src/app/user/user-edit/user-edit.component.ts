import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  user: any = {};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.userService.getUser(+params.get("id"))
        )
      )
      .subscribe(
        (user: User) => {
          this.user.id = user.id;
          this.userForm.setValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            introduction: user.introduction,
            position: user.position,
            status: user.status
          });
        },
        error => {
          this.router.navigate(["/users"]);
        }
      );

    this.onChanges();
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      introduction: "",
      position: "",
      status: ""
    });
  }

  onChanges() {
    this.userForm.valueChanges.subscribe(user => {
      Object.keys(user).forEach(keyName => {
        this.userForm.get(keyName).valueChanges.subscribe(value => this.user[keyName] = value);
      })
      console.log(this.user);
    });
  }

  onSubmit() {
    const { id } = this.user;
    const { firstName, lastName, status } = this.userForm.value;
    const updatedUser: User = {
      id,
      active: status === 1,
      name: `${firstName} ${lastName}`,
      ...this.userForm.value
    };
    console.log(this.userForm.value);
    this.userService.updateUser(updatedUser).subscribe((user: User) => this.user = user)
  }

  deleteUser() {
    const { id } = this.user;
    this.userService.deleteUser(id).subscribe(console.log);
    this.router.navigate(["/users"]);
  }
}
