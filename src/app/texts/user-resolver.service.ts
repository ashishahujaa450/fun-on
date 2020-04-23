import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";

import { Injectable } from "@angular/core";
import { UserStorageService } from "../shared/user-storage.service";

@Injectable({
  providedIn: "root",
})
export class UserResolver implements Resolve<any> {
  constructor(private userStorage: UserStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loadedUser = JSON.parse(localStorage.getItem("userData"));
    return this.userStorage.fetchUser(loadedUser.email);
  }
}
