import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean = false;
  public authUserSub: Subscription;
  @ViewChild("mobileNav") mnav: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authUserSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.authService.logout();
    this.onNavClose();
  }

  ngOnDestroy() {
    if (this.authUserSub) {
      this.authUserSub.unsubscribe();
    }
  }

  onNavClose() {
    (<HTMLElement>this.mnav.nativeElement).classList.remove("show");
  }
}
