import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TerritoirePresentation } from '../../../../core/presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-territoire-markers',
  templateUrl: './territoire-markers.component.html'
})
export class TerritoireMarkersComponent {
  @Input() public territoires: TerritoirePresentation[] = [];
  @Input() public hoverId: string = '';

  @Output() showLieux: EventEmitter<TerritoirePresentation> = new EventEmitter<TerritoirePresentation>();
  @Output() public highlight: EventEmitter<TerritoirePresentation | undefined> = new EventEmitter<
    TerritoirePresentation | undefined
  >();

  public trackByTerritoireCode(_: number, territoire: TerritoirePresentation) {
    return territoire.code;
  }
}
