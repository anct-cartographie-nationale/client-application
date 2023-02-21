import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FrancePresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-france-markers',
  templateUrl: './france-markers.component.html'
})
export class FranceMarkersComponent {
  @Input() public zones: FrancePresentation[] = [];
  @Output() showLieux: EventEmitter<FrancePresentation> = new EventEmitter<FrancePresentation>();

  public trackByZoneCode(_: number, zone: FrancePresentation) {
    return zone.code;
  }
}
