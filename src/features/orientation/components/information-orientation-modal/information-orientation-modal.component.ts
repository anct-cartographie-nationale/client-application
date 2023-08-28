import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../core/components';
import { OrientationInformationContent } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-information-orientation-modal',
  templateUrl: './information-orientation-modal.component.html'
})
export class InformationOrientationModalComponent {
  @ViewChild(ModalComponent) control!: ModalComponent;

  @Input() public orientationInformation: OrientationInformationContent | null = null;
}
