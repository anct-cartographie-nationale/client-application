import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-hours',
  templateUrl: './structure-hours.component.html',
  styleUrls: ['./structure-hours.component.scss'],
})
export class StructureHoursComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Input() hoursForm: FormGroup;
  @Output() hours = new EventEmitter<any>();
  @Output() hoursError = new EventEmitter<any>();
  @Output() validateForm = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public updateHours(value) {
    this.hours.emit(value);
  }
  public setHoursError() {
    this.hoursError.emit();
  }
}
