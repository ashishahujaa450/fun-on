import { Injectable } from "@angular/core";
import { AuthInterface, AuthResponse } from "./auth.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private signUpUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private loginUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  public user = new BehaviorSubject<User>(null);

  public expireTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.router.navigate(["auth"]);
    this.user.next(null);
    localStorage.removeItem("userData");

    if (this.expireTimer) {
      clearTimeout(this.expireTimer);
    }
  }

  private autoLogout(expirationTimer: number) {
    this.expireTimer = setTimeout(() => {
      this.logout();
    }, expirationTimer);
  }

  autoLogin() {
    const loadeduser = JSON.parse(localStorage.getItem("userData"));

    if (loadeduser) {
      const verifiedUser = new User(
        loadeduser.email,
        loadeduser.id,
        loadeduser._token,
        new Date(loadeduser._tokenExpiration),
        loadeduser.name
      );

      if (verifiedUser && verifiedUser.token) {
        this.user.next(verifiedUser);

        const expiretime =
          new Date(loadeduser._tokenExpiration).getTime() -
          new Date().getTime();

        this.autoLogout(expiretime);
      } else {
        return;
      }
    }
  }

  private handleError(error: string): string {
    let message = "An Unknown Error Occured, Please try again!";

    switch (error) {
      case "EMAIL_EXISTS":
        message = "Email Already in Use!";
        break;

      case "OPERATION_NOT_ALLOWED":
        message = "Following operation not allowed!";
        break;

      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        message =
          "We have blocked all requests from this device due to unusual activity. Try again later!";
        break;

      case "EMAIL_NOT_FOUND":
        message = "Email address is not found. Please enter a valid email!";
        break;

      case "INVALID_PASSWORD":
        message = "The Password is Invalid!";
        break;

      case "USER_DISABLED":
        message = "The user account has been disabled by an administrator.";
        break;

      default:
        message = "An Unknown Error Occured, Please try again!";
    }

    return message;
  }

  private handleAuth(data: AuthResponse, authData: AuthInterface) {
    const expireTime = new Date(new Date().getTime() + +data.expiresIn * 1000);

    const loadeduser = new User(
      data.email,
      data.localId,
      data.idToken,
      expireTime,
      authData.userName
    );

    this.user.next(loadeduser);
    this.autoLogout(+data.expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(loadeduser));
  }

  signUp(data: AuthInterface) {
    return this.http
      .post<AuthResponse>(`${this.signUpUrl}${environment.webApiKey}`, data)
      .pipe(
        tap((response) => {
          this.handleAuth(response, data);
        }),
        catchError((response) => {
          return throwError(this.handleError(response.error.error.message));
        })
      );
  }

  logIn(data: AuthInterface) {
    return this.http
      .post<AuthResponse>(`${this.loginUrl}${environment.webApiKey}`, data)
      .pipe(
        tap((response) => {
          this.handleAuth(response, data);
        }),
        catchError((response) => {
          return throwError(this.handleError(response.error.error.message));
        })
      );
  }
}
