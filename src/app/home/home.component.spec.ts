import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let originalTimeout;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCoord(): should get coord', async () => {
    await new Promise((resolve) => {
      component.getCoord('Rue de la Mairie ', 'Feyzin').subscribe(
        (val) => {
          expect(val.geometry.getLat()).toEqual(4.8591584);
          expect(val.geometry.getLon()).toEqual(45.6727968);
          resolve();
        },
        (err) => {
          resolve();
        }
      );
    });
  });

  it('getAddress(): should getAddress', () => {
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(() => {
      const position = {
        coords: {
          accuracy: 1490,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          latitude: 45.747404800000005,
          longitude: 4.8529408,
          speed: null,
        },
      };
      return position;
    });
    component.getLocation();
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  });
});
