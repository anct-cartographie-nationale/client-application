import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartementPresentation } from '../../../core';

@Component({
  selector: 'app-regions-list',
  template: ''
})
export class RegionsListStubComponent {
  @Input() regions: DepartementPresentation[] = [];

  @Output() showLieux: EventEmitter<DepartementPresentation> = new EventEmitter<DepartementPresentation>();
}
