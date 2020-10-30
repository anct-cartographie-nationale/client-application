import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
const { DateTime } = require('luxon');
import * as _ from 'lodash';
import { Structure } from '../models/structure.model';
import { StructureService } from '../services/structure-list.service';
import { GeoJson } from '../map/models/geojson.model';
import { GeojsonService } from '../services/geojson.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public structures: Structure[] = [];
  public displayMarkerId: number;
  public selectedMarkerId: number;
  public geolocation = false;
  public currentLocation: GeoJson;
  constructor(private structureService: StructureService, private geoJsonService: GeojsonService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      this.getLocation();
    }
    this.getStructures();
  }

  public getStructures(): void {
    this.structureService.getStructures().subscribe((structures) => {
      Promise.all(
        structures.map((structure) => {
          if (this.geolocation) {
            return this.getStructurePosition(structure).then((val) => {
              return this.structureService.updateOpeningStructure(val, DateTime.local());
            });
          } else {
            return this.structureService.updateOpeningStructure(structure, DateTime.local());
          }
        })
      ).then((structureList) => {
        this.structures = _.sortBy(structureList, ['distance']);
      });
    });
  }

  /**
   * Get structures positions and add marker corresponding to those positons on the map
   */
  private getStructurePosition(structure: Structure): Promise<Structure> {
    return new Promise((resolve, reject) => {
      this.getCoord(structure.voie).subscribe((coord: GeoJson) => {
        structure.distance = this.geoJsonService.getDistance(
          coord.geometry.getLon(),
          coord.geometry.getLat(),
          this.currentLocation.geometry.getLon(),
          this.currentLocation.geometry.getLat(),
          'M'
        );
        resolve(structure);
      });
    });
  }

  /**
   * Get coord with a street reference
   * @param idVoie Street reference
   */
  public getCoord(idVoie: number): Observable<GeoJson> {
    console.log('in');
    return this.geoJsonService.getAddressByIdVoie(idVoie).pipe(mergeMap((res) => this.geoJsonService.getCoord(res)));
  }

  public getLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.geolocation = true;
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.getAddress(longitude, latitude);
    });
  }

  private getAddress(longitude: number, latitude: number): void {
    this.geoJsonService.getAddressByCoord(longitude, latitude).subscribe(
      (location) => (this.currentLocation = location),
      (err) => console.error(err)
    );
  }

  public setMapMarkerId(event: Array<number>): void {
    this.displayMarkerId = event[0];
  }

  public setSelectedMarkerId(id: number): void {
    console.log('setSelectedMarker', id);
    this.selectedMarkerId = id;
  }
}
