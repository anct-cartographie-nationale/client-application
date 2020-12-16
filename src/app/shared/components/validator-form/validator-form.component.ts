import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validator-form',
  templateUrl: './validator-form.component.html',
  styleUrls: ['./validator-form.component.scss'],
})
export class ValidatorFormComponent {
  @Input() public control: FormControl;
  constructor() {}
}
