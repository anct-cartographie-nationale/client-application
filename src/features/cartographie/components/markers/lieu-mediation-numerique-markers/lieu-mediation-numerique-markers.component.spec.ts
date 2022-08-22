import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LieuMediationNumeriqueMarkersComponent } from './lieu-mediation-numerique-markers.component';

describe('LieuMediationNumeriqueMarkersComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuMediationNumeriqueMarkersComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuMediationNumeriqueMarkersComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuMediationNumeriqueMarkersComponent> = TestBed.createComponent(
      LieuMediationNumeriqueMarkersComponent
    );
    const lieuMediationNumeriqueMarkersComponent: LieuMediationNumeriqueMarkersComponent = fixture.componentInstance;
    expect(lieuMediationNumeriqueMarkersComponent).toBeTruthy();
  });
});
