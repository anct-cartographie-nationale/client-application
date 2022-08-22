import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LieuxMediationNumeriqueListComponent } from './lieux-mediation-numerique-list.component';

describe('LieuxMediationNumeriqueListComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuxMediationNumeriqueListComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuxMediationNumeriqueListComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuxMediationNumeriqueListComponent> = TestBed.createComponent(
      LieuxMediationNumeriqueListComponent
    );
    const dieuxMediationNumeriqueListComponent: LieuxMediationNumeriqueListComponent = fixture.componentInstance;
    expect(dieuxMediationNumeriqueListComponent).toBeTruthy();
  });
});
