import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

import { TextInterface, CommentInterface } from "../texts/text.model";
import { TextService } from "../texts/text.service";

@Injectable({
  providedIn: "root",
})
export class TextDataService {
  public textUrl: string = "https://funon-a808f.firebaseio.com/";

  constructor(private http: HttpClient, private textService: TextService) {}

  uploadText(text: TextInterface) {
    return this.http.post(`${this.textUrl}texts.json`, text);
  }

  fetchText() {
    return this.http.get<TextInterface[]>(`${this.textUrl}texts.json`).pipe(
      map((response: TextInterface[]) => {
        const arr = new Array();
        for (let key in response) {
          const item = response[key];

          const updatedItem = {
            ...item,
            id: key,
          };
          if (item.comment && item.comment.length > 0) {
            updatedItem.comment = item.comment;
          } else {
            updatedItem.comment = [];
          }
          arr.push(updatedItem);
        }
        return arr;
      }),
      tap((textListing: TextInterface[]) => {
        this.textService.fillList(textListing);
      })
    );
  }

  updatePost(newText: TextInterface, id: string) {
    return this.http.put(`${this.textUrl}texts/${id}.json`, newText);
  }
}
