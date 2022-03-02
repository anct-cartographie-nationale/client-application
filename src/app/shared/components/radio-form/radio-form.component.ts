import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-radio-form',
  templateUrl: './radio-form.component.html',
  styleUrls: ['./radio-form.component.scss'],
})
export class RadioFormComponent implements OnInit {
  constructor() {}

  @Input() public selectedOption: boolean;
  @Input() public horizontal: boolean;
  @Input() public layoutGap: string;
  @Input() public name: string;
  @Input() events: Observable<Object>;
  @Output() selectedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  private eventsSubscription: Subscription;

  ngOnInit(): void {
    if (this.events) this.eventsSubscription = this.events.subscribe((data: boolean) => (this.selectedOption = data));
  }

  ngOnDestroy() {
    if (this.eventsSubscription) this.eventsSubscription.unsubscribe();
  }

  public clicked(bool: boolean): void {
    this.selectedOption = bool;
    this.selectedEvent.emit(this.selectedOption);
  }
}
