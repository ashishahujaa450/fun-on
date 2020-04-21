import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean = false;
  public authUserSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authUserSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
      }
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authUserSub) {
      this.authUserSub.unsubscribe();
    }
  }
}
