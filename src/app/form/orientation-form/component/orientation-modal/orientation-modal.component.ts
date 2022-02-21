import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-orientation-modal',
  templateUrl: './orientation-modal.component.html',
  styleUrls: ['./orientation-modal.component.scss'],
})
export class OrientationComponent {
  @Input() public openned: boolean;
  @Output() closed = new EventEmitter();
  @Output() previousPage = new EventEmitter();

  public closeModal(): void {
    this.closed.emit();
  }
  public goToPreviousPage(): void {
    this.closeModal();
    this.previousPage.emit();
  }
}
