import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OpeningState } from '../../../../core/presenters';
import { SourcePresentation } from '../../../presenters';
import { isTooOld } from './informations-generales.presenter';

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
  @Input() public source: SourcePresentation | undefined;

  @Output() public closeDetails: EventEmitter<void> = new EventEmitter<void>();

  public isTooOld = isTooOld(new Date());
}
