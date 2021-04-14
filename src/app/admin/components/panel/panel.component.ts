import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AdminPannelEnum } from '../../../shared/enum/adminPanel.enum';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
  public features = AdminPannelEnum;
  public ghostLink = environment.ghostAdmin;
  public selectedFeature;

  constructor() {}

  ngOnInit(): void {
    this.selectedFeature = this.features.pendingStructures;
  }

  public changeActiveFeature(newFeature: AdminPannelEnum): void {
    this.selectedFeature = newFeature;
  }
}
