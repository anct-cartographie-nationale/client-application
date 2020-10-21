import { TestBed } from '@angular/core/testing';
import { Map } from 'leaflet';

import { MapService } from './map.service';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create marke with coord {lat: 45.764043, lng: 4.835659}', () => {
    const marker = service.createMarker(45.764043, 4.835659, 1);

    expect(marker.getLatLng().lat).toEqual(45.764043);
    expect(marker.getLatLng().lng).toEqual(4.835659);
  });
  it('should add marker to map with icon ic_marker.png', () => {
    const marker = service.createMarker(45.764043, 4.835659, 1);
    expect(marker.getIcon().options.iconSize).toEqual([35, 41]);
    expect(marker.getIcon().options.iconAnchor).toEqual([13, 41]);
  });

  it('should cerate marker with tooltip', () => {
    const marker = service.createMarker(45.764043, 4.835659, 1, '<p>Hello <br/>World !</p>');

    expect(marker.getTooltip().getContent()).toEqual('<p>Hello <br/>World !</p>');
  });

  it('should get marker', () => {
    const marker = service.createMarker(45.764043, 4.835659, 1, '<p>Hello <br/>World !</p>');
    expect(marker).toEqual(service.getMarker(1));
  });
  it('should not get marker, with missing id', () => {
    service.createMarker(45.764043, 4.835659, 1, '<p>Hello <br/>World !</p>');
    expect(service.getMarker(2)).toEqual(null);
  });
  it('should not get marker, empty', () => {
    expect(service.getMarker(1)).toEqual(null);
  });
});
