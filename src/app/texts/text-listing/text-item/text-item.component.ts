import { Component, OnInit, Input } from "@angular/core";
import { TextInterface } from "../../text.model";
import { TextService } from "../../text.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-text-item",
  templateUrl: "./text-item.component.html",
  styleUrls: ["./text-item.component.scss"],
})
export class TextItemComponent implements OnInit {
  @Input() textItem: TextInterface;

  constructor(private textService: TextService, private router: Router) {}

  ngOnInit(): void {}

  onSelectText() {
    this.textService.selectedPost.next(this.textItem);
    console.log(this.textItem);
    this.router.navigate(["text-detail"]);
  }
}
