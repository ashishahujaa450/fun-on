import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TextService } from "../text.service";
import { TextInterface, CommentInterface } from "../text.model";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";

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

    this.statePersistence();
  }

  //state persistence when app re-loads on the same page
  private statePersistence() {
    if (this.selectedPost) {
      localStorage.setItem(
        environment.selectedPostDetail,
        JSON.stringify(this.selectedPost)
      );
    } else {
      this.selectedPost = JSON.parse(
        localStorage.getItem(environment.selectedPostDetail)
      );
    }
  }

  switchLike() {
    this.isLiked = !this.isLiked;
  }

  onComment(form: NgForm) {
    const value = form.form.value;
    //add comment to list
    const comment: CommentInterface = {
      body: value.commentBody,
    };

    //set date & user with comment
    comment.date = new Date();
    comment.user = this.selectedPost.user;

    //add comment to post
    this.textService.addComments(comment, this.selectedPost.id);
    console.log(this.selectedPost.comment);

    form.reset();
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    if (localStorage.getItem(environment.selectedPostDetail)) {
      localStorage.removeItem(environment.selectedPostDetail);
    }
  }
}
