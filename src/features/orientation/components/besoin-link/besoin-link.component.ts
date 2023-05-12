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

  @Output() public selectServiceValue: EventEmitter<string> = new EventEmitter<string>();

  @Output() public displayInformations: EventEmitter<Service> = new EventEmitter<Service>();
}
