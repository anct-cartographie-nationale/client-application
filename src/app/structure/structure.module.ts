import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureComponent } from './structure.component';
import { CardComponent } from './components/card/card.component';
import { RechercheComponent } from './components/recherche/recherche.component';

@NgModule({
  declarations: [StructureComponent, CardComponent, RechercheComponent],
  imports: [CommonModule],
  exports: [StructureComponent],
})
export class StructureModule {}
