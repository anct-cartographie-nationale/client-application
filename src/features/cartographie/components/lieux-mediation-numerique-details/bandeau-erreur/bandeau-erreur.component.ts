import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bandeau-erreur',
  templateUrl: './bandeau-erreur.component.html'
})
export class BandeauErreurComponent {
  @Output() public openErreurFormModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() public closeDetails: EventEmitter<void> = new EventEmitter<void>();
  @Output() public openOrientationSheetModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() public openImpressionChoiceModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
