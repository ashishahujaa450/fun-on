import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { TextInterface } from "../texts/text.model";

@Injectable({
  providedIn: "root",
})
export class TextDataService {
  public textUrl: string = "https://funon-a808f.firebaseio.com/";

  constructor(private http: HttpClient) {}

  uploadText(text: TextInterface) {
    return this.http.post(`${this.textUrl}texts.json`, text);
  }
}
