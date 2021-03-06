import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Token } from "../models/token";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("inputEmail") email: ElementRef;
  @ViewChild("inputPassword") password: ElementRef;

  authenticationError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (sessionStorage.getItem("access_token")) {
      this.router.navigate(["/users"]);
    }
  }

  onSubmit() {
    const username = this.email.nativeElement.value;
    const password = this.password.nativeElement.value;
    this.authService.login(username, password).subscribe(
      (res: Token) => {
        sessionStorage.setItem("access_token", res.access_token);
        this.authService.loginStatus(true);
        this.router.navigate(["/users"]);
      },
      (error: HttpErrorResponse) => {
        this.authenticationError = true;
      }
    );
  }
}
