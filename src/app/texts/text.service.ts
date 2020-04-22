import { Injectable } from "@angular/core";

import { TextInterface, CommentInterface } from "./text.model";
import { TextDataService } from "../shared/text-data.service";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TextService {
  private textListing: TextInterface[] = [];

  public selectedPost = new BehaviorSubject<TextInterface>(null);

  constructor(private authService: AuthService) {}

  get getTextListing() {
    return this.textListing;
  }

  //add text
  addText(item: TextInterface) {
    //create unique id
    // item.id =
    //   this.textListing.length > 0
    //     ? this.textListing[this.textListing.length - 1].id + 1
    //     : 1;

    //attach date with the post
    item.date = new Date();

    //attach user with the post
    this.authService.user.subscribe((user) => {
      item.user = user;
    });

    //push item into text listing
    this.textListing.push(item);
  }

  //remove text
  removeText(index: number) {
    this.textListing.splice(index, 1);
  }

  getTextByIndex(index: number): TextInterface {
    return this.textListing[index];
  }

  fillList(list: TextInterface[]) {
    this.textListing.splice(0, this.textListing.length);

    list.forEach((text) => {
      this.textListing.push(text);
    });
  }

  addComments(comments: CommentInterface, id: number) {
    this.textListing.forEach((elm) => {
      if (elm.id == id) {
        elm.comment.push(comments);
      }
    });
  }
}
