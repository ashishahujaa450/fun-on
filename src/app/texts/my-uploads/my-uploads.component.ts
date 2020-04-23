import { Component, OnInit, OnDestroy } from "@angular/core";
import { TextDataService } from "src/app/shared/text-data.service";
import { Subscription } from "rxjs";
import { TextInterface } from "../text.model";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/user.model";

@Component({
  selector: "app-my-uploads",
  templateUrl: "./my-uploads.component.html",
  styleUrls: ["./my-uploads.component.scss"],
})
export class MyUploadsComponent implements OnInit, OnDestroy {
  public textSubscription: Subscription;
  public myPostListing: TextInterface[] = [];
  public authSubscription: Subscription;
  public authUser: User;
  public isLoading: boolean = false;

  constructor(
    private textDataService: TextDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //get auth user
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.authUser = user;
    });

    this.isLoading = true;
    this.textSubscription = this.textDataService
      .fetchText()
      .pipe(
        map((response) => {
          const filteredList = response.filter(
            (elm) => elm.user.email === this.authUser.email
          );
          return filteredList;
        })
      )
      .subscribe(
        (list: TextInterface[]) => {
          this.myPostListing = list;
          this.isLoading = false;
        },
        (error) => {
          alert("Unknown Error, Please try again later");
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.textSubscription) {
      this.textSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
