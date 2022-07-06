import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LieuCardComponent } from './lieu-card.component';

describe('LieuCardComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuCardComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuCardComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuCardComponent> = TestBed.createComponent(LieuCardComponent);
    const lieuCardComponent: LieuCardComponent = fixture.componentInstance;
    expect(lieuCardComponent).toBeTruthy();
  });
});
