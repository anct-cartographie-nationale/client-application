import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrientationLayout } from '../layouts';
import { AddressFieldComponent, CollapseComponent, CollapsibleComponent, DropdownPaneComponent } from '../components';
import { OrientationFeatureRoutingModule } from './orientation.feature-routing.module';
import { BesoinPage, DatePage, DemarrerPage, LocalisationPage, AccessibilitePage } from '../pages';
import { CheckboxArrayDirective, UncheckableRadioDirective } from '../directives';

@NgModule({
  declarations: [
    OrientationLayout,
    BesoinPage,
    DatePage,
    DemarrerPage,
    LocalisationPage,
    AccessibilitePage,
    AddressFieldComponent,
    CollapseComponent,
    CollapsibleComponent,
    DropdownPaneComponent,
    UncheckableRadioDirective,
    CheckboxArrayDirective
  ],
  imports: [OrientationFeatureRoutingModule, CommonModule, ReactiveFormsModule]
})
export class OrientationFeatureModule {}
