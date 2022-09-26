import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OpeningStatus } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-informations-generales',
  templateUrl: './informations-generales.component.html'
})
export class InformationsGeneralesComponent {
  @Input() public id: string = '';
  @Input() public nom: string = '';
  @Input() public typologie?: string;
  @Input() public date?: Date;
  @Input() public status?: OpeningStatus;

  public constructor(private location: Location) {}

  public back() {
    this.location.back();
  }
}
