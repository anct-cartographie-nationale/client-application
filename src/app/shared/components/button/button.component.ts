import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public style: string;
  @Input() public text: string;
  @Input() public type: string;
  @Input() public iconBtn: string;
  constructor() {}

  ngOnInit(): void {}
}
