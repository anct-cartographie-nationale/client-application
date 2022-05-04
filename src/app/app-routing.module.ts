import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { CartoComponent } from './carto/carto.component';
import { StructureDetailsComponent } from './structure-list/components/structure-details/structure-details.component';
import { StructureListComponent } from './structure-list/structure-list.component';

const routes: Routes = [
  {
    path: 'print',
    outlet: 'print',
    children: [{ path: 'structure', component: StructureDetailsComponent }]
  },
  {
    path: 'acteurs',
    component: CartoComponent
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
