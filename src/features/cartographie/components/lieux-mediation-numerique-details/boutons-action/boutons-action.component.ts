import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html'
})
export class BoutonsActionComponent {
  @Input() public courriel?: string;
  @Input() public siteWeb?: string[];
  @Input() public priseRdv?: string;

  @Output() public orientationSheet: EventEmitter<void> = new EventEmitter<void>();
  @Output() public print: EventEmitter<void> = new EventEmitter<void>();
}
