import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../../common/mediation-numerique.routes';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([...ROUTES, { path: '**', pathMatch: 'full', redirectTo: 'cartographie' }])]
})
export class MediationNumeriqueWebComponentRoutingModule {}
