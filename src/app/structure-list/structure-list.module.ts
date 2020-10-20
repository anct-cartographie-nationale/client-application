import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureListComponent } from './structure-list.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StructureListComponent, CardComponent, SearchComponent],
  imports: [CommonModule, HttpClientModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
  exports: [StructureListComponent],
})
export class StructureListModule {}
