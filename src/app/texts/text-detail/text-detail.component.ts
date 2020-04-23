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
  public alreadyLiked: boolean = false;

  public isLiked: boolean = false;

  public likeErrorMessage: string = null;

  public likeClasses = {
    "btn-primary": this.isLiked || this.alreadyLiked,
    "btn-outline-primary": !this.isLiked && !this.alreadyLiked,
  };

  public badgeClasses = {
    "badge-light": this.isLiked || this.alreadyLiked,
    "badge-edit": !this.isLiked && !this.alreadyLiked,
  };

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

    //check already liked post
    if (this.authUser) {
      this.checkAlreadyLike();
    }
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

    //like post
    this.likePost();

    //switch mode
    this.isLiked = !this.isLiked;
  }

  private checkAlreadyLike() {
    for (let i = 0; i < this.selectedPost.likeUsersList.length; i++) {
      if (this.authUser.email === this.selectedPost.likeUsersList[i].email) {
        this.alreadyLiked = true;
        break;
      } else {
        this.alreadyLiked = false;
      }
    }
  }

  likePost() {
    //check if already liked
    this.checkAlreadyLike();
    if (!this.alreadyLiked) {
      //like post and store it into database
      this.selectedPost.likeUsersList.push(this.authUser);
      this.updatePostInDatabase();
      this.alreadyLiked = false;
    }
  }

  onClose() {
    this.likeErrorMessage = null;
  }

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
    //update post
    this.updatePostInDatabase();

    //reset form
    form.reset();
  }

  private updatePostInDatabase() {
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

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
