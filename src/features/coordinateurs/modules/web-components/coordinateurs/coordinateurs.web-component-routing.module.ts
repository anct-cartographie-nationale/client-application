import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../../common/coordinateurs.routes';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(ROUTES)]
})
export class CoordinateursWebComponentRoutingModule {}
