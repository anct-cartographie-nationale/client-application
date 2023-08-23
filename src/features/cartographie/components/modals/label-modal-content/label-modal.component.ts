import { ChangeDetectionStrategy, Component, Inject, Input, ViewChild } from '@angular/core';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../../root';
import { ModalComponent } from '../../../../core/components';
import { LabelPresentation } from '../../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-label-modal[label]',
  templateUrl: './label-modal.component.html'
})
export class LabelModalComponent {
  @ViewChild(ModalComponent) public control!: ModalComponent;

  @Input() public label: LabelPresentation | null = null;

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}
}
