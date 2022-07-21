import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from '../layouts';

const ROUTES: Routes = [
  {
    children: [
      {
        loadChildren: async () => (await import('@features/cartographie/infrastructure')).CartographieFeatureModule,
        path: ''
      }
    ],
    component: MainLayout,
    path: 'cartographie'
  },
  {
    children: [
      {
        loadChildren: async () => (await import('@features/orientation/infrastructure')).OrientationFeatureModule,
        path: ''
      }
    ],
    component: MainLayout,
    path: 'orientation'
  },
  { path: '**', pathMatch: 'full', redirectTo: 'cartographie' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
