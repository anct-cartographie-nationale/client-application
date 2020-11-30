import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-phone',
  templateUrl: './menu-phone.component.html',
  styleUrls: ['./menu-phone.component.scss'],
})
export class MenuPhoneComponent implements OnInit {
  constructor() {}

  @Output() closeEvent = new EventEmitter();
  ngOnInit(): void {}

  closeMenu(): void {
    this.closeEvent.emit();
  }
}
