import { Component, OnInit, Input } from "@angular/core";
import { TextCategory } from "src/app/texts.category";

@Component({
  selector: "app-category-card",
  templateUrl: "./category-card.component.html",
  styleUrls: ["./category-card.component.scss"],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: TextCategory;

  constructor() {}

  ngOnInit(): void {}
}
