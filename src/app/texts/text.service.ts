import { Injectable } from "@angular/core";

import { TextInterface } from "./text.model";
import { TextDataService } from "../shared/text-data.service";

@Injectable({
  providedIn: "root",
})
export class TextService {
  private textListing: TextInterface[] = [];

  constructor() {}

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
}
