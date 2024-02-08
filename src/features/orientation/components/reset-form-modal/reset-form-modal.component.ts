import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild, Inject } from '@angular/core';
import { ModalComponent } from '@features/core';
import { BRAND_TOKEN, BrandConfiguration } from 'projects/client-application/src/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-reset-form-modal',
  templateUrl: './reset-form-modal.component.html'
})
export class ResetFormModalComponent {
  @ViewChild(ModalComponent) control!: ModalComponent;

  @Output() public resetAllFilter: EventEmitter<string> = new EventEmitter<string>();

  public constructor(@Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration) {}
}
