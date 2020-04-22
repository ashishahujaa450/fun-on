import { Injectable } from "@angular/core";
import { UserInterface } from "../auth/user.model";
import { HttpClientModule, HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserStorageService {
  private UserStoreUrl: string = "https://funon-a808f.firebaseio.com/";

  constructor(private http: HttpClient) {}

  storeUser(user: UserInterface, authenticatedUser) {
    return this.http.post(`${this.UserStoreUrl}users.json`, user, {
      params: new HttpParams().set("auth", authenticatedUser),
    });
  }

  fetchUser() {
    return this.http.get(`${this.UserStoreUrl}users.json`).pipe(
      map((response) => {
        const newUsersModifiedList = new Array();

        for (let key in response) {
          const userObj = response[key];

          const updatedUserObj = { ...userObj, treeKey: key, likedPost: [] };
          newUsersModifiedList.push(updatedUserObj);
        }
        return newUsersModifiedList;
      })
    );
  }
}
