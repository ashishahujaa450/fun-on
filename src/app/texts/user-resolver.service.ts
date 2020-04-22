import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { TextInterface } from "./text.model";
import { Injectable } from "@angular/core";
import { UserStorageService } from "../shared/user-storage.service";

@Injectable({
  providedIn: "root",
})
export class UserResolver implements Resolve<TextInterface[]> {
  constructor(private userStorage: UserStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userStorage.fetchUser();
  }
}
