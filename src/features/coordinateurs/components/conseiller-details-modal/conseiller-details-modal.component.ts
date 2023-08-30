import { ChangeDetectionStrategy, Component, Inject, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { ModalComponent } from '../../../core/components';
import { Conseiller } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-conseiller-details-modal',
  templateUrl: './conseiller-details-modal.component.html'
})
export class ConseillerDetailsModalComponent {
  @ViewChild(ModalComponent) public control!: ModalComponent;

  @Input() coordinateur?: { id: string; nom: string };
  @Input() conseiller?: Conseiller & { distance?: number };
  @Input() distance?: number;
  @Input() route: ActivatedRoute | null = null;

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}
}
