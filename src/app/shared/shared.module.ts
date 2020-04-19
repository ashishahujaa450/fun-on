import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { SuccessPopupComponent } from "./success-popup/success-popup.component";

@NgModule({
  declarations: [LoadingSpinnerComponent, SuccessPopupComponent],
  imports: [],
  exports: [LoadingSpinnerComponent, SuccessPopupComponent],
})
export class SharedModule {}
