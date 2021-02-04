import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-form',
  templateUrl: './footer-form.component.html',
  styleUrls: ['./footer-form.component.scss'],
})
export class FooterFormComponent implements OnInit {
  @Input() isValid: boolean;
  @Output() nextPage = new EventEmitter<any>();
  @Output() previousPage = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    console.log(this.isValid);
  }

  public goToNextPage(): void {
    this.nextPage.emit();
  }
  public goToPreviousPage(): void {
    this.previousPage.emit();
  }
}
