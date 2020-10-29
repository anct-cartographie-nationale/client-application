import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponents } from './components';
import { SharedPipes } from './pipes';
import { SharedDirectives } from './directives';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  imports: [CommonModule, RouterModule, FlexLayoutModule],
  declarations: [...SharedPipes, ...SharedComponents, ...SharedDirectives],
  exports: [...SharedPipes, ...SharedComponents, ...SharedDirectives],
})
export class SharedModule {}
