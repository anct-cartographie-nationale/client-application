import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFieldComponent, DropdownPaneComponent } from '../components';
import { HighlightPipe } from '../pipes';

@NgModule({
  declarations: [SearchFieldComponent, DropdownPaneComponent, HighlightPipe],
  exports: [SearchFieldComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AdresseModule {}
