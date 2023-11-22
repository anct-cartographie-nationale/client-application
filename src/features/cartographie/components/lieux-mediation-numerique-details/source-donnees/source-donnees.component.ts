import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-source-donnees',
  templateUrl: './source-donnees.component.html'
})
export class SourceDonneesComponent {}
