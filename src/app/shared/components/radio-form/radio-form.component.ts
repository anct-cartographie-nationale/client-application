import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio-form',
  templateUrl: './radio-form.component.html',
  styleUrls: ['./radio-form.component.scss'],
})
export class RadioFormComponent implements OnInit {
  constructor() {}

  @Input() public selectedOption: boolean;
  @Output() selectedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(): void {}

  public clicked(bool: boolean): void {
    this.selectedOption = bool;
    this.selectedEvent.emit(this.selectedOption);
  }
}
