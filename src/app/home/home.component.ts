import { Component, OnInit } from '@angular/core';
import { Structure } from '../models/structure.model';
import { StructureService } from '../services/structure-list.service';
import { GeoJson } from '../map/models/geojson.model';
import { GeojsonService } from '../services/geojson.service';
const { DateTime } = require('luxon');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public structures: Structure[] = [];
  public geolocation = false;
  public currentLocation: GeoJson;
  constructor(private structureService: StructureService, private geojsonService: GeojsonService) {}

  ngOnInit(): void {
    this.getStructures();
    if (navigator.geolocation) {
      this.getLocation();
    }
  }

  public getStructures(): void {
    this.structureService.getStructures().subscribe((structures) => {
      this.structures = structures.map((structure) =>
        this.structureService.updateOpeningStructure(structure, DateTime.local())
      );
    });
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
    this.geojsonService.getAddressByCoord(longitude, latitude).subscribe(
      (location) => (this.currentLocation = location),
      (err) => console.error(err)
    );
  }
}
