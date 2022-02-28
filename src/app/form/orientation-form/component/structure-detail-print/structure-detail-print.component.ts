import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Structure } from '../../../../models/structure.model';
import * as _ from 'lodash';
import { TclService } from '../../../../services/tcl.service';
import { TclStopPoint } from '../../../../models/tclStopPoint.model';
import { AuthService } from '../../../../services/auth.service';
import { AccessModality } from '../../../../structure-list/enum/access-modality.enum';
@Component({
  selector: 'app-structure-detail-print',
  templateUrl: './structure-detail-print.component.html',
  styleUrls: ['./structure-detail-print.component.scss'],
})
export class StructureDetailPrintComponent implements OnInit {
  @Input() public structure: Structure;
  @Output() public closeDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public dataReady: EventEmitter<boolean> = new EventEmitter<boolean>();
  public accessModality = AccessModality;
  public tclStopPoints: TclStopPoint[] = [];

  constructor(private tclService: TclService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    // GetTclStopPoints
    this.getTclStopPoints();
    const index = this.structure.proceduresAccompaniment.indexOf('autres');
    if (index > -1) {
      this.structure.proceduresAccompaniment.splice(index, 1);
    }
  }

  public keepOriginalOrder = (a, b) => a.key;

  public userIsLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getTclStopPoints(): void {
    this.tclService.getTclStopPointBycoord(this.structure.getLon(), this.structure.getLat()).subscribe((res) => {
      this.tclStopPoints = res;
    });
  }
}
