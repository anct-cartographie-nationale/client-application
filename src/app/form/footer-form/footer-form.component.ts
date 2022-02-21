import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-form',
  templateUrl: './footer-form.component.html',
  styleUrls: ['./footer-form.component.scss'],
})
export class FooterFormComponent {
  @Input() isValid: boolean;
  @Input() btnName: string[];
  @Input() displayPreviousButton: boolean = true;
  @Output() nextPage = new EventEmitter<any>();
  @Output() previousPage = new EventEmitter<any>();
  @Output() endPage = new EventEmitter<any>();

  public goToNextPage(): void {
    this.nextPage.emit();
  }

  public goToPreviousPage(): void {
    this.previousPage.emit();
  }

  public hasFinishButton(): boolean {
    return this.btnName.length == 3;
  }
  public finishedModal(): void {
    this.endPage.emit();
  }
}
