import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DepartementMarkersComponent } from './departement-markers.component';

describe('DepartementMarkersComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DepartementMarkersComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DepartementMarkersComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<DepartementMarkersComponent> = TestBed.createComponent(DepartementMarkersComponent);
    const departementMarkersComponent: DepartementMarkersComponent = fixture.componentInstance;
    expect(departementMarkersComponent).toBeTruthy();
  });
});
