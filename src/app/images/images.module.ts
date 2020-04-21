import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ImagesRoutingModule } from "./images-routing.module";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [ImageUploadComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ImagesModule {}
