import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartoComponent } from './carto/carto.component';
import { StructureDetailsComponent, StructureListComponent } from '@gouvfr-anct/mediation-numerique';

const routes: Routes = [
  {
    path: 'acteurs',
    component: CartoComponent
  },
  {
    path: 'print',
    outlet: 'print',
    children: [
      {
        path: 'structure',
        component: StructureDetailsComponent
      }
    ]
  },
  {
    path: 'structures',
    children: [
      {
        path: '',
        component: StructureListComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'acteurs'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
