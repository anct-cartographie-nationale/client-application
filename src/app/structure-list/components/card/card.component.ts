import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class CardComponent implements OnInit, OnChanges {
  @Input() public structure: Structure;
  @Input() public geolocation: GeoJson;
  public distance: string;

  constructor(private geoJsonService: GeojsonService) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.geolocation.currentValue) {
      this.getStructurePosition();
    }
  }

  /**
   * Get structures positions and add marker corresponding to those positons on the map
   */
  private getStructurePosition(): void {
    this.getCoord(this.structure.voie).subscribe((coord: GeoJson) => {
      this.distance = this.geoJsonService.getDistance(
        coord.geometry.getLon(),
        coord.geometry.getLat(),
        this.geolocation.geometry.getLon(),
        this.geolocation.geometry.getLat(),
        'M'
      );
      this.formatDistance();
    });
  }

  private formatDistance(): void {
    if (this.distance.length > 3) {
      this.distance = (parseInt(this.distance, 10) / 1000).toFixed(1).toString() + ' km';
    } else {
      this.distance += ' m';
    }
  }

  /**
   * Get coord with a street reference
   * @param idVoie Street reference
   */
  public getCoord(idVoie: number): Observable<GeoJson> {
    return this.geoJsonService.getAddressByIdVoie(idVoie).pipe(mergeMap((res) => this.geoJsonService.getCoord(res)));
  }
}
