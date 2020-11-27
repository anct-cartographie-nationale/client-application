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
  public userLatitude: number;
  public userLongitude: number;
  constructor(private structureService: StructureService, private geoJsonService: GeojsonService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      this.getLocation();
    } else {
      this.getStructures(null);
    }
  }

  public getStructures(filters: Filter[]): void {
    const queryString = _.find(filters, { name: 'query' });
    if (queryString) {
      if (this.isLocationRequest(queryString.value)) {
        this.getCoordByAddress(queryString.value).then((res) => {
          this.currentLocation = res;
          this.updateStructuresdistance(
            this.structures,
            this.currentLocation.geometry.getLon(),
            this.currentLocation.geometry.getLat()
          );
        });
      } else {
        this.structureService.getStructures(filters).subscribe((structures) => {
          if (structures) {
            this.updateStructuresdistance(structures, this.userLongitude, this.userLatitude);
          } else {
            this.structures = null;
          }
        });
      }
    } else {
      this.structureService.getStructures(filters).subscribe((structures) => {
        if (structures) {
          this.updateStructuresdistance(structures, this.userLongitude, this.userLatitude);
        } else {
          this.structures = null;
        }
      });
    }
  }

  private updateStructuresdistance(structures: Structure[], lon: number, lat: number): void {
    Promise.all(
      structures.map((structure) => {
        if (this.geolocation) {
          structure = this.getStructurePosition(structure, lon, lat);
        }
        return this.structureService.updateOpeningStructure(structure, DateTime.local());
      })
    ).then((structureList) => {
      structureList = _.sortBy(structureList, ['distance']);
      this.structures = structureList;
    });
  }

  /**
   * Retrive GeoJson for a given address
   * @param address string
   */
  private getCoordByAddress(address: string): Promise<GeoJson> {
    return new Promise((resolve) => {
      this.geoJsonService.getCoord(address, '', '69000').subscribe((res) => {
        resolve(res);
      });
    });
  }

  /**
   * Check with a regex that an address is request
   * @param value string
   */
  private isLocationRequest(value: string): boolean {
    const regex = /^\d+\s[A-z]+\s[A-z]+/g;
    if (value.match(regex)) {
      return true;
    }
    return false;
  }

  /**
   * Get structures positions and add marker corresponding to those positons on the map
   * @param structure Structure
   * @param lon number
   * @param lat number
   */
  private getStructurePosition(structure: Structure, lon: number, lat: number): Structure {
    structure.distance = parseInt(
      this.geoJsonService.getDistance(structure.getLat(), structure.getLon(), lat, lon, 'M'),
      10
    );
    return structure;
  }

  public getLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.geolocation = true;
      this.userLongitude = position.coords.longitude;
      this.userLatitude = position.coords.latitude;
      this.getAddress(position.coords.longitude, position.coords.latitude);
      this.getStructures(null);
    });
  }

  /**
   * Get an address by coord
   * @param longitude number
   * @param latitude number
   */
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
