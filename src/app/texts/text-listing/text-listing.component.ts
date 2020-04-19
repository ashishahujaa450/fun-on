import { Component, OnInit } from "@angular/core";
import { TextInterface } from "../text.model";
import { TextService } from "../text.service";
import { TextDataService } from "src/app/shared/text-data.service";

@Component({
  selector: "app-text-listing",
  templateUrl: "./text-listing.component.html",
  styleUrls: ["./text-listing.component.scss"],
})
export class TextListingComponent implements OnInit {
  public textListing: TextInterface[] = [];

  constructor(
    private textService: TextService,
    private textDataService: TextDataService
  ) {}

  ngOnInit(): void {
    this.textListing = this.textService.getTextListing;

    this.textDataService.fetchText().subscribe((daata) => {
      console.log(daata);
    });
  }
}
