import { Component, Input } from '@angular/core';
import { Service } from 'projects/client-application/src/models';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  @Input() public services?: Service[];
}
