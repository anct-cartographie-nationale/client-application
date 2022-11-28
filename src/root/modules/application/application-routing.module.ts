import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../common/mediation-numerique.routes';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      ...ROUTES,
      {
        loadChildren: async () => (await import('@features/presentation')).PresentationFeatureModule,
        path: 'presentation'
      },
      {
        loadChildren: async () => (await import('@features/mentions-legales')).MentionsLegalesFeatureModule,
        path: 'mentions-legales'
      },
      {
        loadChildren: async () => (await import('@features/accessibilite')).AccessibiliteFeatureModule,
        path: 'accessibilite'
      },
      { path: '**', pathMatch: 'full', redirectTo: 'orientation' }
    ])
  ]
})
export class ApplicationRoutingModule {}
