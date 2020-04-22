import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CategoryDashboardComponent } from "./category-dashboard/category-dashboard.component";
import { TextUploadComponent } from "./text-upload/text-upload.component";
import { TextListingComponent } from "./text-listing/text-listing.component";
import { TextResolver } from "./text-resolver.service";
import { AuthGuardGuard } from "../auth/auth-guard.guard";
import { TextDetailComponent } from "./text-detail/text-detail.component";
import { UserResolver } from "./user-resolver.service";

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
    resolve: [TextResolver, UserResolver],
  },
  {
    path: "text-detail",
    component: TextDetailComponent,
    resolve: [TextResolver, UserResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextsRoutingModule {}
