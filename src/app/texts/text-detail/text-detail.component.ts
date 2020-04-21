import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TextService } from "../text.service";
import { TextInterface } from "../text.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-text-detail",
  templateUrl: "./text-detail.component.html",
  styleUrls: ["./text-detail.component.scss"],
})
export class TextDetailComponent implements OnInit, OnDestroy {
  public postSubscription: Subscription;
  public selectedPost: TextInterface;

  public isLiked: boolean = false;

  constructor(private textService: TextService) {}

  ngOnInit(): void {
    this.postSubscription = this.textService.selectedPost.subscribe(
      (textPost: TextInterface) => {
        this.selectedPost = textPost;
      }
    );
  }

  switchLike() {
    this.isLiked = !this.isLiked;
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
