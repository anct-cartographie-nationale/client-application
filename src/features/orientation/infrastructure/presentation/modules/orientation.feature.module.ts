import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrientationLayout } from '../layouts';
import { AddressFieldComponent, CollapseComponent, DropdownPaneComponent } from '../components';
import { OrientationFeatureRoutingModule } from './orientation.feature-routing.module';
import { BesoinPage, DisponibilitePage, DemarrerPage, LocalisationPage, AccessibilitePage } from '../pages';
import { CheckboxArrayDirective, UncheckableRadioDirective } from '../directives';

@NgModule({
  declarations: [
    OrientationLayout,
    BesoinPage,
    DisponibilitePage,
    DemarrerPage,
    LocalisationPage,
    AccessibilitePage,
    AddressFieldComponent,
    CollapseComponent,
    DropdownPaneComponent,
    UncheckableRadioDirective,
    CheckboxArrayDirective
  ],
  imports: [OrientationFeatureRoutingModule, CommonModule, ReactiveFormsModule]
})
export class OrientationFeatureModule {}
