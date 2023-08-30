import { ChangeDetectionStrategy, Component, Inject, Input, ViewChild } from '@angular/core';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../../root';
import { ModalComponent } from '../../../../core/components';
import { HubPresentation } from '../../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hub-modal',
  templateUrl: './hub-modal.component.html'
})
export class HubModalComponent {
  @ViewChild(ModalComponent) public control!: ModalComponent;

  @Input() hub: HubPresentation | null = null;

  public constructor(@Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration) {}
}
