import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BesoinPage } from './besoin.page';

describe('BesoinPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [BesoinPage]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('BesoinPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<BesoinPage> = TestBed.createComponent(BesoinPage);
    const besoinPage: BesoinPage = fixture.componentInstance;
    expect(besoinPage).toBeTruthy();
  });
});
