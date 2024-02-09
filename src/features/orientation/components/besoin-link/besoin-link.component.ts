import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OrientationItemPresentation } from '../../presenters';
import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-besoin-link',
  templateUrl: './besoin-link.component.html'
})
export class BesoinLinkComponent {
  @Input() public serviceItems?: OrientationItemPresentation<string>[];

  @Input() public selectedServiceItem?: string;

  @Input() public serviceFilter: string | null = '';

  @Output() public selectServiceValue: EventEmitter<string> = new EventEmitter<string>();

  @Output() public addLastFilter: EventEmitter<string> = new EventEmitter<string>();

  @Output() public displayInformations: EventEmitter<Service> = new EventEmitter<Service>();

  @Output() public displayInformationsInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
