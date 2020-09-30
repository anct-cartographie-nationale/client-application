import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor() {}

  public openLegalNotice(): void {
    console.log('openLegalNotice');
  }

  public openContactDialog(): void {
    console.log('openContactDialog');
  }
}
