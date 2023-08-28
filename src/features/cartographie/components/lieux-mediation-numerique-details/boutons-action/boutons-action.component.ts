import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html'
})
export class BoutonsActionComponent {
  @Input() public siteWeb: string[] | undefined;

  @Input() public priseRdv: string | undefined;

  @Output() public print: EventEmitter<void> = new EventEmitter<void>();

  @Output() public sendByEmail: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
