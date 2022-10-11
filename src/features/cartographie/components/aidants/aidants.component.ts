import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-aidants',
  templateUrl: './aidants.component.html'
})
export class AidantsComponent {}
