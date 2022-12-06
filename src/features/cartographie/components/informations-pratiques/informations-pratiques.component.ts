import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Url } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-informations-pratiques',
  templateUrl: './informations-pratiques.component.html'
})
export class InformationsPratiquesComponent {
  @Input() public adresse!: string;
  @Input() public conditionsAcces?: string;
  @Input() public accessibilite?: Url;
  @Input() public courriel?: string;
  @Input() public telephone?: string;
  @Input() public distance?: number;
}
