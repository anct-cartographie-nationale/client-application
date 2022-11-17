import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressFieldComponent, DropdownPaneComponent } from '../components';

@NgModule({
  declarations: [AddressFieldComponent, DropdownPaneComponent],
  exports: [AddressFieldComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AdresseModule {}
