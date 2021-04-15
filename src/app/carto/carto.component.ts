import { Component, OnInit } from '@angular/core';
const { DateTime } = require('luxon');
import * as _ from 'lodash';

import { Structure } from '../models/structure.model';
import { StructureService } from '../services/structure.service';
import { Filter } from '../structure-list/models/filter.model';
import { GeoJson } from '../map/models/geojson.model';
import { GeojsonService } from '../services/geojson.service';
import { CustomRegExp } from '../utils/CustomRegExp';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carto',
  templateUrl: './carto.component.html',
  styleUrls: ['./carto.component.scss'],
})
export class CartoComponent implements OnInit {
  public structures: Structure[] = [];
  public displayMarkerId: string;
  public selectedMarkerId: string;
  public geolocation = false;
  public currentLocation: GeoJson;
  public currentStructure: Structure;
  public userLatitude: number;
  public userLongitude: number;
  public isMapPhone = false;
  public searchedValue = null;
  public locate = false; // Use to sync location between search and map
  constructor(
    private structureService: StructureService,
    private geoJsonService: GeojsonService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.queryParamMap.get('search')) {
      if (navigator.geolocation) {
        this.getLocation();
      } else {
        this.getStructures(null);
      }
    }

    if (history.state.data) {
      this.currentStructure = new Structure(history.state.data);
    }
  }

  public getStructures(filters: Filter[]): void {
    const queryString = _.find(filters, { name: 'query' });
    if (queryString) {
      this.searchedValue = queryString.value;
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
      this.searchedValue = null;
      this.structureService.getStructures(filters).subscribe((structures) => {
        if (structures) {
          this.updateStructuresdistance(structures, this.userLongitude, this.userLatitude);
        } else {
          this.structures = null;
        }
      });
    }
  }

  public updateStructures(s: Structure): void {
    this.structures = this.structures.map((structure) => {
      return structure._id === s._id ? s : structure;
    });
  }

  private updateStructuresdistance(structures: Structure[], lon: number, lat: number): void {
    Promise.all(
      structures.map((structure) => {
        if (this.geolocation) {
          structure = this.getStructurePosition(structure, lon, lat);
        }
        return this.structureService.updateOpeningStructure(structure);
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
    if (value.match(CustomRegExp.LOCATION)) {
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocation = true;
        this.userLongitude = position.coords.longitude;
        this.userLatitude = position.coords.latitude;
        this.getAddress(position.coords.longitude, position.coords.latitude);
        this.getStructures(null);
      },
      (err) => {
        if (err.PERMISSION_DENIED) {
          this.getStructures(null);
        }
      }
    );
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

  public setMapMarkerId(event: string): void {
    this.displayMarkerId = event;
  }

  public setSelectedMarkerId(id: string): void {
    this.selectedMarkerId = id;
  }

  public showDetailStructure(structure: Structure): void {
    this.currentStructure = new Structure(structure);
  }

  public switchMapList(): void {
    this.isMapPhone = !this.isMapPhone;
  }

  public locatationTrigger(event: any): void {
    if (event && event !== this.locate) {
      this.locate = !this.locate;
    }
    if (!event) {
      this.locate = true;
    }
  }

  public locatationReset(): void {
    this.locate = false;
  }
}
