import { Component } from '@angular/core';
import { PrintService } from './shared/service/print.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pamn';

  constructor(public printService: PrintService) {}
}
