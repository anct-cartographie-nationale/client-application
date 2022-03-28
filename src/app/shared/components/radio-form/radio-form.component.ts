import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-radio-form',
  templateUrl: './radio-form.component.html',
  styleUrls: ['./radio-form.component.scss'],
})
export class RadioFormComponent implements OnInit {
  constructor() {}

  @Input() public selectedOption: boolean | string;
  @Input() public horizontal: boolean;
  @Input() public layoutGap: string;
  @Input() public name: string;
  @Input() events: Observable<Object>;
  @Input() isThreeChoices: boolean = false;
  @Output() selectedEvent = new EventEmitter<any>();

  private eventsSubscription: Subscription;

  ngOnInit(): void {
    if (this.events) this.eventsSubscription = this.events.subscribe((data: boolean) => (this.selectedOption = data));
  }

  ngOnDestroy() {
    if (this.eventsSubscription) this.eventsSubscription.unsubscribe();
  }

  public clicked(val: boolean | string): void {
    this.selectedOption = val;
    this.selectedEvent.emit(this.selectedOption);
  }
}
