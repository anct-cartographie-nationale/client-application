import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFieldComponent, DropdownPaneComponent } from '../components';

@NgModule({
  declarations: [SearchFieldComponent, DropdownPaneComponent],
  exports: [SearchFieldComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AdresseModule {}
