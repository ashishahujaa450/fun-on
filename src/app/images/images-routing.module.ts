import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { AuthGuardGuard } from "../auth/auth-guard.guard";

const routes: Routes = [
  {
    path: "image-upload",
    component: ImageUploadComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesRoutingModule {}
