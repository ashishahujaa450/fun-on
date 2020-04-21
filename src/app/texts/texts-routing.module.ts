import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CategoryDashboardComponent } from "./category-dashboard/category-dashboard.component";
import { TextUploadComponent } from "./text-upload/text-upload.component";
import { TextListingComponent } from "./text-listing/text-listing.component";
import { TextResolver } from "./text-resolver.service";

const routes: Routes = [
  {
    path: "text-dashboard",
    component: CategoryDashboardComponent,
  },
  { path: "", redirectTo: "/text-dashboard", pathMatch: "full" },
  { path: "text-upload", component: TextUploadComponent },
  {
    path: "text-listing",
    component: TextListingComponent,
    resolve: [TextResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextsRoutingModule {}
