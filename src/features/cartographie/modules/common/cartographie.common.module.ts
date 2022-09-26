import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DistanceModule } from '@gouvfr-anct/mediation-numerique/shared';
import { pages } from '../../pages';
import { CartographieLayout, ListHeaderLayout } from '../../layouts';
import { components } from '../../components';
import { directives } from '../../directives';
import { pipes } from '../../pipes';

@NgModule({
  declarations: [CartographieLayout, ListHeaderLayout, ...pages, ...components, ...directives, ...pipes],
  exports: [CartographieLayout, ...pages, ...components, ...directives],
  imports: [CommonModule, HttpClientModule, DistanceModule, RouterModule]
})
export class CartographieCommonModule {}
