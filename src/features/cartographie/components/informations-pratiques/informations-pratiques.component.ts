import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConditionAccess, Url } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-informations-pratiques',
  templateUrl: './informations-pratiques.component.html'
})
export class InformationsPratiquesComponent {
  @Input() public adresse!: string;
  @Input() public conditionAccess?: ConditionAccess[];
  @Input() public accessibilite?: Url;
  @Input() public courriel?: string;
  @Input() public telephone?: string;
  @Input() public distance?: number;
}
