import { Component, Input } from '@angular/core';
import { Adresse, ConditionAccess, Contact, Url } from 'projects/client-application/src/models';

@Component({
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
