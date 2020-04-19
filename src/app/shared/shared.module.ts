import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { SuccessPopupComponent } from "./success-popup/success-popup.component";
import { StringTruncatePipe } from "./string-truncate.pipe";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    SuccessPopupComponent,
    StringTruncatePipe,
  ],
  imports: [],
  exports: [LoadingSpinnerComponent, SuccessPopupComponent, StringTruncatePipe],
})
export class SharedModule {}
