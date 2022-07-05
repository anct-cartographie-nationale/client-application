import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrientationLayout } from '../layouts';
import { AddressFieldComponent, CollapseComponent, DropdownPaneComponent } from '../components';
import { OrientationFeatureRoutingModule } from './orientation.feature-routing.module';
import { BesoinPage, DatePage, DemarrerPage, LocalisationPage, SpecificitePage } from '../pages';

@NgModule({
  declarations: [
    OrientationLayout,
    BesoinPage,
    DatePage,
    DemarrerPage,
    LocalisationPage,
    SpecificitePage,
    AddressFieldComponent,
    CollapseComponent,
    DropdownPaneComponent
  ],
  imports: [OrientationFeatureRoutingModule, CommonModule, ReactiveFormsModule]
})
export class OrientationFeatureModule {}
