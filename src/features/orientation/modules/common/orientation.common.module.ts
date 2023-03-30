import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxArrayModule } from '../../../core';
import { AdresseModule } from '../../../adresse';
import { pages } from '../../pages';
import { OrientationLayout } from '../../layouts';
import { components } from '../../components';
import { directives } from '../../directives';

@NgModule({
  declarations: [OrientationLayout, ...pages, ...components, ...directives],
  exports: [OrientationLayout, ...pages, ...components, ...directives],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule, AdresseModule, CheckboxArrayModule]
})
export class OrientationCommonModule {}
