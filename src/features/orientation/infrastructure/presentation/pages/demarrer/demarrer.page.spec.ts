import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemarrerPage } from './demarrer.page';
import { BRAND_TOKEN } from '../../../../../../root';

describe('DemarrerPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DemarrerPage],
      providers: [
        {
          provide: BRAND_TOKEN,
          useValue: {}
        }
      ]
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
