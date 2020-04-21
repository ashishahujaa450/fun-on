import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CategoryDashboardComponent } from "./category-dashboard/category-dashboard.component";
import { TextUploadComponent } from "./text-upload/text-upload.component";
import { TextListingComponent } from "./text-listing/text-listing.component";
import { TextResolver } from "./text-resolver.service";
import { AuthGuardGuard } from "../auth/auth-guard.guard";

const routes: Routes = [
  {
    path: "text-dashboard",
    component: CategoryDashboardComponent,
  },
  { path: "", redirectTo: "/text-dashboard", pathMatch: "full" },
  {
    path: "text-upload",
    component: TextUploadComponent,
    canActivate: [AuthGuardGuard],
  },
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
