import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasComponent } from './offcanvas.component';
import { RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [OffcanvasComponent],
  imports: [CommonModule, RouterLinkActive],
  exports: [OffcanvasComponent]
})
export class OffcanvasModule {}
