import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-error-popup",
  templateUrl: "./error-popup.component.html",
  styleUrls: ["./error-popup.component.scss"],
})
export class ErrorPopupComponent implements OnInit {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigate(["auth"]);
  }

  onClose() {
    this.close.emit();
  }
}
