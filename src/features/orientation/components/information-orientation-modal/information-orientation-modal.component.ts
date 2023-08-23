import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { OrientationInformationContent } from '../../presenters';
import { ModalComponent } from '../../../core/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-information-orientation-modal',
  templateUrl: './information-orientation-modal.component.html'
})
export class InformationOrientationModalComponent {
  @ViewChild(ModalComponent) control!: ModalComponent;

  @Input() public orientationInformation: OrientationInformationContent | null = null;
}
