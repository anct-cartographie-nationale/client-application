/* eslint-disable @angular-eslint/component-selector */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'dropdownPane',
  selector: '[appDropdownPane]',
  template: ''
})
export class DropdownPaneStubComponent {}
