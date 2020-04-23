import { Injectable } from "@angular/core";
import { UserInterface } from "../auth/user.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { UserDataStorageService } from "./user-data-storage.service";

@Injectable({
  providedIn: "root",
})
export class UserStorageService {
  private UserStoreUrl: string = "https://funon-a808f.firebaseio.com/";

  constructor(
    private http: HttpClient,
    private userListStorage: UserDataStorageService
  ) {}

  storeUser(user: UserInterface, authenticatedUser) {
    return this.http.post(`${this.UserStoreUrl}users.json`, user, {
      params: new HttpParams().set("auth", authenticatedUser),
    });
  }

  fetchUser(email: string) {
    return this.http.get(`${this.UserStoreUrl}users.json`).pipe(
      map((response) => {
        const newUsersModifiedList = new Array();

        for (let key in response) {
          const userObj = response[key];

          const updatedUserObj = { ...userObj, treeKey: key };
          newUsersModifiedList.push(updatedUserObj);
        }
        return newUsersModifiedList;
      }),
      tap((userList) => {
        this.userListStorage.setUserList(userList);
      })
    );
  }
}
