import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TextsRoutingModule } from "./texts-routing.module";
import { CategoryDashboardComponent } from "./category-dashboard/category-dashboard.component";
import { CategoryCardComponent } from "./category-dashboard/category-card/category-card.component";
import { TextListingComponent } from "./text-listing/text-listing.component";
import { TextItemComponent } from "./text-listing/text-item/text-item.component";
import { TextUploadComponent } from "./text-upload/text-upload.component";
import { SharedModule } from "../shared/shared.module";
import { TextDetailComponent } from "./text-detail/text-detail.component";
import { MyUploadsComponent } from './my-uploads/my-uploads.component';

@NgModule({
  declarations: [
    CategoryDashboardComponent,
    CategoryCardComponent,
    TextListingComponent,
    TextItemComponent,
    TextUploadComponent,
    TextDetailComponent,
    MyUploadsComponent,
  ],
  imports: [
    CommonModule,
    TextsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TextsModule {}
