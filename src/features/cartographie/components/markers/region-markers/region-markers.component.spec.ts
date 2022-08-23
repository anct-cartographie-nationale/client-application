import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegionMarkersComponent } from './region-markers.component';

describe('RegionMarkersComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [RegionMarkersComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('RegionMarkersComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<RegionMarkersComponent> = TestBed.createComponent(RegionMarkersComponent);
    const regionMarkersComponent: RegionMarkersComponent = fixture.componentInstance;
    expect(regionMarkersComponent).toBeTruthy();
  });
});
