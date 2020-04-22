import { Component, OnInit, OnDestroy } from "@angular/core";
import { TextInterface } from "../text.model";
import { TextService } from "../text.service";
import { TextDataService } from "src/app/shared/text-data.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { map } from "rxjs/operators";
import { UserStorageService } from "src/app/shared/user-storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-text-listing",
  templateUrl: "./text-listing.component.html",
  styleUrls: ["./text-listing.component.scss"],
})
export class TextListingComponent implements OnInit, OnDestroy {
  public textListing: TextInterface[] = [];
  public selectedCategory: string = "";
  public isLoading: boolean = false;
  private textDataSubscription: Subscription;

  constructor(
    private textService: TextService,
    private textDataService: TextDataService,
    private router: Router,
    private route: ActivatedRoute,
    private userStorage: UserStorageService
  ) {}

  ngOnInit(): void {
    // this.textListing = this.textService.getTextListing;

    //slice categorized texts
    this.route.queryParams.subscribe((params: Params) => {
      this.selectedCategory = params.category;
    });

    this.isLoading = true;
    this.textDataSubscription = this.textDataService
      .fetchText()
      .pipe(
        map((response) => {
          return this.filterCategoryArr(this.selectedCategory, response);
        })
      )
      .subscribe((filterdList) => {
        this.textListing = filterdList;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    if (this.textDataSubscription) {
      this.textDataSubscription.unsubscribe();
    }
  }

  private filterCategoryArr(
    category: string,
    fullList: TextInterface[]
  ): TextInterface[] {
    if (category && category === "All") {
      return fullList;
    }

    if (category && category.length > 0) {
      const filterdArr = new Array();
      fullList.forEach((elm) => {
        if (elm.category.includes(category)) {
          filterdArr.push(elm);
        }
      });

      return filterdArr;
    } else {
      return fullList;
    }
  }
}
