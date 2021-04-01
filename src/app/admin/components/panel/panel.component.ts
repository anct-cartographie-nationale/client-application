import { Component, OnInit } from '@angular/core';
import { AdminPannelEnum } from '../../../shared/enum/adminPanel.enum';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
  public features = AdminPannelEnum;
  public selectedFeature;

  constructor() {}

  ngOnInit(): void {
    this.selectedFeature = this.features.pendingStructures;
  }

  public changeActiveFeature(newFeature: AdminPannelEnum) {
    this.selectedFeature = newFeature;
  }
}
