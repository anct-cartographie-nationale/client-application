import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponents } from './components';
import { SharedPipes } from './pipes';
import { SharedDirectives } from './directives';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...SharedPipes, ...SharedComponents, ...SharedDirectives],
  exports: [...SharedPipes, ...SharedComponents, ...SharedDirectives],
})
export class SharedModule {}
