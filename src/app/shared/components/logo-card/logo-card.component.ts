import { Component, Input, OnInit } from '@angular/core';
import { Demarches } from '../../enum/demarches.enum';
import { Labels } from '../../enum/labels.emum';

@Component({
  selector: 'app-logo-card',
  templateUrl: './logo-card.component.html',
  styleUrls: ['./logo-card.component.scss'],
})
export class LogoCardComponent implements OnInit {
  @Input() public logoPath: string;
  @Input() public name: string;
  public demarches = Demarches;
  public labels = Labels;

  constructor() {}

  ngOnInit(): void {}

  public getLogoKey(demarche: string): string {
    // return Demarches[demerche];
    switch (demarche) {
      case Demarches.pole_emploi:
        return 'pole_emploi';
      case Demarches.caf:
        return 'caf';
      case Demarches.carsat:
        return 'carsat';
      case Demarches.cpam:
        return 'cpam';
      case Demarches.impots:
        return 'impots';
      case Demarches.logements:
        return 'logements';
      case Demarches.other:
        return 'other';
      default:
        return this.getLabelKey(demarche);
    }
  }

  private getLabelKey(demarche: string): string {
    switch (demarche) {
      case Labels.aidants_connect:
        return 'aidants_connect';
      case Labels.maison_france_service:
        return 'maison_france_service';
      case Labels.pass_numerique:
        return 'pass_numerique';
      default:
        return 'null';
    }
  }
}
