import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TextService } from "../text.service";
import { TextInterface, CommentInterface } from "../text.model";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { TextDataService } from "src/app/shared/text-data.service";
import { User } from "src/app/auth/user.model";

@Component({
  selector: "app-text-detail",
  templateUrl: "./text-detail.component.html",
  styleUrls: ["./text-detail.component.scss"],
})
export class TextDetailComponent implements OnInit, OnDestroy {
  public postSubscription: Subscription;
  public selectedPost: TextInterface;
  public isLoading: boolean = false;
  public commentSubscription: Subscription;
  public authUser: User = null;
  public userSubscription: Subscription;

  public isLiked: boolean = false;

  public likeErrorMessage: string = null;

  constructor(
    private textService: TextService,
    private textDataService: TextDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.textService.selectedPost.subscribe(
      (textPost: TextInterface) => {
        this.selectedPost = textPost;
      }
    );

    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = null;
      }
    });

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
    //check if user is authorized to like or not
    if (!this.authUser) {
      this.likeErrorMessage = "Only Login users can like or comment on posts.";
      return;
    } else {
      this.likeErrorMessage = null;
    }

    this.isLiked = !this.isLiked;
  }

  onClose() {
    this.likeErrorMessage = null;
  }

  private test() {}

  onComment(form: NgForm) {
    const value = form.form.value;
    //add comment to list
    const comment: CommentInterface = {
      body: value.commentBody,
    };

    //set date & user with comment
    comment.date = new Date();
    comment.user = this.authUser;

    //add comment to post
    this.textService.addComments(comment, this.selectedPost.id);

    this.isLoading = true;
    //update post in database
    this.commentSubscription = this.textDataService
      .updatePost(this.selectedPost, String(this.selectedPost.id))
      .subscribe(
        (response) => {
          this.isLoading = false;
        },
        (error) => {
          alert("some error occured, please try again later");
          this.isLoading = false;
        }
      );

    //reset form
    form.reset();
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    if (localStorage.getItem(environment.selectedPostDetail)) {
      localStorage.removeItem(environment.selectedPostDetail);
    }

    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }
}
