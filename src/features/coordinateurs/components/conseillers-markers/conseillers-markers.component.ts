import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ConseillerOnMapPresentation, CoordinateurOnMapPresentation } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-conseillers-markers',
  templateUrl: './conseillers-markers.component.html'
})
export class ConseillersMarkersComponent {
  @Input() public conseillers: ConseillerOnMapPresentation[] = [];

  @Input() public zoom: number = 0;

  @Output() public highlight: EventEmitter<ConseillerOnMapPresentation | undefined> = new EventEmitter<
    ConseillerOnMapPresentation | undefined
  >();

  @Output() public showDetails: EventEmitter<ConseillerOnMapPresentation> = new EventEmitter<ConseillerOnMapPresentation>();

  @Output() public showDetailsInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public trackByConseillerId = (_: number, conseiller: ConseillerOnMapPresentation) => conseiller.id;
}
