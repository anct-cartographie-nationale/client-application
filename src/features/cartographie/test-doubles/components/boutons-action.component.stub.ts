import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boutons-action',
  template: ''
})
export class BoutonsActionStubComponent {
  @Input() public courriel?: string;
  @Input() public siteWeb?: string[];
  @Input() public priseRdv?: string;
}
