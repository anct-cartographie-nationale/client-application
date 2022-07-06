import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrientationLayout } from '../layouts';
import { AddressFieldComponent, CollapseComponent, DropdownPaneComponent } from '../components';
import { OrientationFeatureRoutingModule } from './orientation.feature-routing.module';
import { BesoinPage, DatePage, DemarrerPage, LocalisationPage, AccessibilitePage } from '../pages';
import { UncheckableRadioDirective } from '../directives';

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
    DropdownPaneComponent,
    UncheckableRadioDirective
  ],
  imports: [OrientationFeatureRoutingModule, CommonModule, ReactiveFormsModule]
})
export class OrientationFeatureModule {}
