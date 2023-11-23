import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSeparatorComponent } from './text-separator.component';
import { RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [TextSeparatorComponent],
  imports: [CommonModule, RouterLinkActive],
  exports: [TextSeparatorComponent]
})
export class TextSeparatorModule {}
