import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConseillerOnMapPresentation } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-conseillers-markers',
  templateUrl: './conseillers-markers.component.html'
})
export class ConseillersMarkersComponent {
  @Input() public conseillers: ConseillerOnMapPresentation[] = [];

  public trackByConseillerId = (_: number, conseiller: ConseillerOnMapPresentation) => conseiller.id;
}
