import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedComponents } from './components';
import { SharedPipes } from './pipes';
import { SharedDirectives } from './directives';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { AddressAutocompleteComponent } from './components/address-autocomplete/address-autocomplete.component';
import { HourPickerComponent } from './components/hour-picker/hour-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, FlexLayoutModule, ReactiveFormsModule],
  declarations: [
    ...SharedPipes,
    ...SharedComponents,
    ...SharedDirectives,
    SvgIconComponent,
    AddressAutocompleteComponent,
    HourPickerComponent,
  ],
  exports: [
    ...SharedPipes,
    ...SharedComponents,
    ...SharedDirectives,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
