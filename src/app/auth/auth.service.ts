import { Injectable, OnDestroy } from "@angular/core";
import { AuthInterface, AuthResponse } from "./auth.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject, Subscribable, Subscription } from "rxjs";
import { User, UserInterface } from "./user.model";
import { Router } from "@angular/router";
import { UserStorageService } from "../shared/user-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  private signUpUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private loginUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  public user = new BehaviorSubject<User>(null);

  public expireTimer: any;
  public userStoreSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStorage: UserStorageService
  ) {}

  logout() {
    this.router.navigate(["auth"]);
    this.user.next(null);
    localStorage.removeItem(environment.authData);

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
    const loadeduser = JSON.parse(localStorage.getItem(environment.authData));

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

    //create user and storeuser
    const singleUser: UserInterface = {
      name: authData.userName,
      email: data.email,
      password: authData.password,
      localId: data.localId,
      likedPost: [],
    };

    this.userStoreSubscription = this.userStorage
      .storeUser(singleUser, loadeduser)
      .subscribe((response) => {});

    this.autoLogout(+data.expiresIn * 1000);
    localStorage.setItem(environment.authData, JSON.stringify(loadeduser));
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

  ngOnDestroy() {
    if (this.userStoreSubscription) {
      this.userStoreSubscription.unsubscribe();
    }
  }
}
