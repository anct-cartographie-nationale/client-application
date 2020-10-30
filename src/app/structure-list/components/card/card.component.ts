import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Structure } from '../../../models/structure.model';
import { GeojsonService } from '../../../services/geojson.service';
import { GeoJson } from '../../../map/models/geojson.model';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public structure: Structure;
  @Output() public showDetails: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() public hover: EventEmitter<Structure> = new EventEmitter<Structure>();

  constructor(private geoJsonService: GeojsonService) {}
  ngOnInit(): void {}

  /**
   * Display distance in m or km according to value
   */
  public formatDistance(): string {
    if (this.structure.distance.length > 3) {
      return (parseInt(this.structure.distance, 10) / 1000).toFixed(1).toString() + ' km';
    } else {
      return this.structure.distance + ' m';
    }
  }

  /**
   * Get coord with a street reference
   * @param idVoie Street reference
   */
  public getCoord(idVoie: number): Observable<GeoJson> {
    return this.geoJsonService.getAddressByIdVoie(idVoie).pipe(mergeMap((res) => this.geoJsonService.getCoord(res)));
  }

  public cardClicked(): void {
    this.showDetails.emit(this.structure);
  }

  public cardHover(): void {
    this.hover.emit(this.structure);
  }
}
