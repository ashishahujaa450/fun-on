import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { SuccessPopupComponent } from "./success-popup/success-popup.component";
import { StringTruncatePipe } from "./string-truncate.pipe";
import { ErrorAlertComponent } from "./error-alert/error-alert.component";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    SuccessPopupComponent,
    StringTruncatePipe,
    ErrorAlertComponent,
  ],
  imports: [],
  exports: [
    LoadingSpinnerComponent,
    SuccessPopupComponent,
    StringTruncatePipe,
    ErrorAlertComponent,
  ],
})
export class SharedModule {}
