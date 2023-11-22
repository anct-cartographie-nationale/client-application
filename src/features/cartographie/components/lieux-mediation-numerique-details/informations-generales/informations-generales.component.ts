import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { OpeningState } from '../../../../core/presenters';
import { SourcePresentation } from '../../../presenters';
import { isTooOld } from './informations-generales.presenter';
import { ASSETS_TOKEN, AssetsConfiguration } from 'projects/client-application/src/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-informations-generales',
  templateUrl: './informations-generales.component.html'
})
export class InformationsGeneralesComponent {
  @Input() public id: string = '';
  @Input() public nom: string = '';
  @Input() public typologie: string | undefined;
  @Input() public date: Date | undefined;
  @Input() public status: OpeningState | undefined;
  @Input() public sources: SourcePresentation[] | undefined;

  @Output() public closeDetails: EventEmitter<void> = new EventEmitter<void>();
  @Output() scrollToSource: EventEmitter<string> = new EventEmitter<string>();

  public isTooOld = isTooOld(new Date());

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}
}
