import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryDashboardComponent } from "./category-dashboard/category-dashboard.component";
import { TextUploadComponent } from "./text-upload/text-upload.component";

const routes: Routes = [
  { path: "text-dashboard", component: CategoryDashboardComponent },
  { path: "", redirectTo: "/text-dashboard", pathMatch: "full" },
  { path: "text-upload", component: TextUploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextsRoutingModule {}
