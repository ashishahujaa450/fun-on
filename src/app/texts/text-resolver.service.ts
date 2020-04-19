import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { TextInterface } from "./text.model";
import { Observable } from "rxjs";
import { TextDataService } from "../shared/text-data.service";
import { TextService } from "./text.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TextResolver implements Resolve<TextInterface[]> {
  constructor(
    private textService: TextService,
    private textDataService: TextDataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.textService.getTextListing.length > 0) {
      return this.textService.getTextListing;
    } else {
      return this.textDataService.fetchText();
    }
  }
}
