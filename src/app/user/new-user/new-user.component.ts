import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from './../user';
import { UserService } from './../../services/user.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  user: Observable<User> = null;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.userService.getUser(+params.get('id')))
    )
  }

}
