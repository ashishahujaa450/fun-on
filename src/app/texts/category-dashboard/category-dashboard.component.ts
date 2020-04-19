import { Component, OnInit } from "@angular/core";
import { TextCategory, CategoryList } from "../../texts.category";

@Component({
  selector: "app-category-dashboard",
  templateUrl: "./category-dashboard.component.html",
  styleUrls: ["./category-dashboard.component.scss"],
})
export class CategoryDashboardComponent implements OnInit {
  public categoryListing: TextCategory[] = CategoryList;

  constructor() {}

  ngOnInit(): void {}
}
