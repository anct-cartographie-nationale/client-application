import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
const { DateTime } = require('luxon');
import * as _ from 'lodash';

import { Structure } from '../models/structure.model';
import { StructureService } from '../services/structure-list.service';
import { Filter } from '../structure-list/models/filter.model';
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
  public currentStructure: Structure;
  constructor(private structureService: StructureService, private geoJsonService: GeojsonService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      this.getLocation();
    } else {
      this.getStructures(null);
    }
  }

  public getStructures(filters: Filter[]): void {
    this.structureService.getStructures(filters).subscribe((structures) => {
      if (structures) {
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
          structureList = _.sortBy(structureList, ['distance']);
          this.structures = structureList;
        });
      } else {
        this.structures = null;
      }
    });
  }

  /**
   * Get structures positions and add marker corresponding to those positons on the map
   */
  private getStructurePosition(structure: Structure): Promise<Structure> {
    return new Promise((resolve, reject) => {
      this.getCoord(structure.n, structure.voie, structure.commune).subscribe((coord: GeoJson) => {
        structure.address = structure.voie + ' - ' + coord.properties.postcode + ' ' + coord.properties.city;
        structure.distance = parseInt(
          this.geoJsonService.getDistance(
            coord.geometry.getLon(),
            coord.geometry.getLat(),
            this.currentLocation.geometry.getLon(),
            this.currentLocation.geometry.getLat(),
            'M'
          ),
          10
        );
        resolve(structure);
      });
    });
  }

  /**
   * Get coord with a street reference
   * @param idVoie Street reference
   */
  public getCoord(numero: string, voie: string, zipcode: string): Observable<GeoJson> {
    return this.geoJsonService.getCoord(numero, voie, zipcode);
  }

  public getLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.geolocation = true;
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.getAddress(longitude, latitude);
      this.getStructures(null);
    });
  }

  private getAddress(longitude: number, latitude: number): void {
    this.geoJsonService.getAddressByCoord(longitude, latitude).subscribe(
      (location) => {
        this.currentLocation = location;
      },
      (err) => {
        throw new Error(err);
      }
    );
  }

  public setMapMarkerId(event: Array<number>): void {
    this.displayMarkerId = event[0];
  }

  public setSelectedMarkerId(id: number): void {
    this.selectedMarkerId = id;
  }

  public showDetailStructure(structure: Structure): void {
    this.currentStructure = new Structure(structure);
  }
}
