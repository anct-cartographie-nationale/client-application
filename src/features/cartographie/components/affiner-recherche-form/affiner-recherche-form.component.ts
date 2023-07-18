import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-affiner-recherche-form',
  templateUrl: './affiner-recherche-form.component.html'
})
export class AffinerRechercheFormComponent {}
