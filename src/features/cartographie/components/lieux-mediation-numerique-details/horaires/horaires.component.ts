import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HorairesPresentation, getIntervalWeekByOffset } from '../../../../core/presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-horaires',
  templateUrl: './horaires.component.html'
})
export class HorairesComponent {
  @Input() public horaires?: HorairesPresentation;
  @Input() public sousTitre: string = '';
  @Input() public weekOffset: string | number = '';

  public getWeekByIteration(weekOffset: string | number): string {
    return getIntervalWeekByOffset(weekOffset);
  }
}
