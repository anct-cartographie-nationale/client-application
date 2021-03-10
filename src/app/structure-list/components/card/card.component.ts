import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Structure } from '../../../models/structure.model';
import { GeojsonService } from '../../../services/geojson.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public structure: Structure;
  @Output() public showDetails: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public hover: EventEmitter<Structure> = new EventEmitter<Structure>();

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {}

  /**
   * Display distance in m or km according to value
   */
  public formatDistance(): string {
    if (this.structure.distance > 1000) {
      return (this.structure.distance / 1000).toFixed(1).toString() + ' km';
    } else {
      return this.structure.distance + ' m';
    }
  }

  public cardClicked(): void {
    this.showDetails.emit(this.structure);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: this.structure._id,
      },
    });
  }

  public cardHover(): void {
    this.hover.emit(this.structure);
  }
  public filterOnlyEquipments(equipmentsAndServices: string[]): string[] {
    return equipmentsAndServices.filter((eqpt) =>
      ['ordinateurs', 'tablettes', 'bornesNumeriques', 'imprimantes', 'scanners', 'wifiEnAccesLibre'].includes(eqpt)
    );
  }
}
