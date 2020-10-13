import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureComponent } from './structure.component';
import { CardComponent } from './components/card/card.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StructureComponent, CardComponent, RechercheComponent],
  imports: [CommonModule, HttpClientModule, FlexLayoutModule, ReactiveFormsModule],
  exports: [StructureComponent],
})
export class StructureModule {}
