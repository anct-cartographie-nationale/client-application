import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-webinaire',
  templateUrl: './webinaire.component.html'
})
export class WebinaireComponent {}
