import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Structure } from '../../../../models/structure.model';
import * as _ from 'lodash';
import { TclService } from '../../../../services/tcl.service';
import { TclStopPoint } from '../../../../models/tclStopPoint.model';
import { AuthService } from '../../../../services/auth.service';
import { AccessModality } from '../../../../structure-list/enum/access-modality.enum';
import { PublicCategorie } from '../../../../structure-list/enum/public.enum';
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

  public userIsLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getAccessLabel(accessModality: AccessModality): string {
    switch (accessModality) {
      case AccessModality.free:
        return 'Accès libre';
      case AccessModality.meeting:
        return 'Sur rendez-vous';
      case AccessModality.meetingOnly:
        return 'Uniquement sur RDV';
      case AccessModality.numeric:
        return 'Téléphone / Visio';
      default:
        return null;
    }
  }

  public getPublicLabel(tagetPublic: PublicCategorie): string {
    switch (tagetPublic) {
      case PublicCategorie.young:
        return 'Jeunes (16 - 25 ans)';
      case PublicCategorie.adult:
        return 'Adultes';
      case PublicCategorie.elderly:
        return 'Séniors (+ de 65 ans)';
      case PublicCategorie.all:
        return 'Tout public';
      case PublicCategorie.under16Years:
        return 'Moins de 16 ans';
      case PublicCategorie.women:
        return 'Uniquement femmes';
      default:
        return null;
    }
  }

  public getTclStopPoints(): void {
    this.tclService.getTclStopPointBycoord(this.structure.getLon(), this.structure.getLat()).subscribe((res) => {
      this.tclStopPoints = res;
    });
  }
}
