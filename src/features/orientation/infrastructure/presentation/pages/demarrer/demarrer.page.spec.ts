import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemarrerPage } from './demarrer.page';

describe('DemarrerPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DemarrerPage]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DemarrerPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<DemarrerPage> = TestBed.createComponent(DemarrerPage);
    const demarrerPage: DemarrerPage = fixture.componentInstance;
    expect(demarrerPage).toBeTruthy();
  });
});
