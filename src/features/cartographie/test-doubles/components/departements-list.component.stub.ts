import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartementPresentation } from '../../../core';

@Component({
  selector: 'app-departements-list',
  template: ''
})
export class DepartementsListStubComponent {
  @Input() departements: DepartementPresentation[] = [];

  @Output() showLieux: EventEmitter<DepartementPresentation> = new EventEmitter<DepartementPresentation>();
}
