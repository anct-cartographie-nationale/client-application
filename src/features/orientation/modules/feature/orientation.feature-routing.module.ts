import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../common/orientation.routes';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class OrientationFeatureRoutingModule {}
