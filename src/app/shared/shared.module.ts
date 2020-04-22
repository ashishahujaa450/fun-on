import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { SuccessPopupComponent } from "./success-popup/success-popup.component";
import { StringTruncatePipe } from "./string-truncate.pipe";
import { ErrorAlertComponent } from "./error-alert/error-alert.component";
import { ErrorPopupComponent } from "./error-popup/error-popup.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    SuccessPopupComponent,
    StringTruncatePipe,
    ErrorAlertComponent,
    ErrorPopupComponent,
  ],
  imports: [RouterModule],
  exports: [
    LoadingSpinnerComponent,
    SuccessPopupComponent,
    StringTruncatePipe,
    ErrorAlertComponent,
    ErrorPopupComponent,
  ],
})
export class SharedModule {}
