import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LieuMediationNumeriqueListItemComponent } from './lieu-mediation-numerique-list-item.component';

describe('LieuMediationNumeriqueListItemComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuMediationNumeriqueListItemComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuMediationNumeriqueListItemComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuMediationNumeriqueListItemComponent> = TestBed.createComponent(
      LieuMediationNumeriqueListItemComponent
    );
    const lieuMediationNumeriqueListItemComponent: LieuMediationNumeriqueListItemComponent = fixture.componentInstance;
    expect(lieuMediationNumeriqueListItemComponent).toBeTruthy();
  });
});
