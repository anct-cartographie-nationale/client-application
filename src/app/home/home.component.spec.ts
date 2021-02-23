import { HttpClientModule } from '@angular/common/http';
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
