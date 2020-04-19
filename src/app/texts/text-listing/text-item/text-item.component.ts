import { Component, OnInit, Input } from "@angular/core";
import { TextInterface } from "../../text.model";

@Component({
  selector: "app-text-item",
  templateUrl: "./text-item.component.html",
  styleUrls: ["./text-item.component.scss"],
})
export class TextItemComponent implements OnInit {
  @Input() textItem: TextInterface;

  constructor() {}

  ngOnInit(): void {}
}
