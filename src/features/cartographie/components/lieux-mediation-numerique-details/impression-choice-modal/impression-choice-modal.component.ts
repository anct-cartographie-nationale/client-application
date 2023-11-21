import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { OrientationSheetForm } from '@features/cartographie/models';
import { ModalComponent } from '@features/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-impression-choice-modal',
  templateUrl: './impression-choice-modal.component.html'
})
export class ImpressionChoiceModalComponent {
  @ViewChild(ModalComponent) control!: ModalComponent;

  @Output() public orientationSheetModalModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() public print: EventEmitter<void> = new EventEmitter<void>();
}
