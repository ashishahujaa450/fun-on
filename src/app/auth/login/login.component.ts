import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { AuthInterface, AuthResponse } from "../auth.model";
import { Subscription, Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public isLoginEnable: boolean = true;
  private authSubscription: Subscription;
  public errorMessage: string = null;
  private authObs: Observable<AuthResponse>;
  public isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  switchLogin() {
    this.isLoginEnable = !this.isLoginEnable;
    this.errorMessage = null;
  }

  onSubmit(form: NgForm) {
    const value = form.form.value;

    const data: AuthInterface = {
      email: value.userEmail,
      password: value.userPwd,
      returnSecureToken: true,
      userName: value.userName,
    };

    this.isLoading = true;
    if (this.isLoginEnable) {
      //lets login
      this.authObs = this.authService.logIn(data);
    } else {
      //lets signup
      this.authObs = this.authService.signUp(data);
    }

    //subscribe to observable
    this.authSubscription = this.authObs.subscribe(
      (response) => {
        this.isLoading = false;

        //routing
        this.router.navigate(["text-dashboard"]);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.errorMessage = errorMessage;
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
