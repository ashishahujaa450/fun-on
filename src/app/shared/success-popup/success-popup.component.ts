import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-success-popup",
  templateUrl: "./success-popup.component.html",
  styleUrls: ["./success-popup.component.scss"],
})
export class SuccessPopupComponent implements OnInit {
  @Input() message: string;
  @Output() successfull = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onOkay() {
    this.successfull.emit();
  }
}
