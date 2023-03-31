import { NgModule } from '@angular/core';
import { CheckboxArrayDirective } from './checkbox-array.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CheckboxArrayDirective],
  imports: [CommonModule],
  exports: [CheckboxArrayDirective]
})
export class CheckboxArrayModule {}
