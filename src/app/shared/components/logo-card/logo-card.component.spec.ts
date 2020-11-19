import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Demarches } from '../../enum/demarches.enum';

import { LogoCardComponent } from './logo-card.component';

describe('LogoCardComponent', () => {
  let component: LogoCardComponent;
  let fixture: ComponentFixture<LogoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return logo name with a string input', () => {
    const logoCaf = component.getLogoKey(Demarches.caf);
    const logoCarsat = component.getLogoKey(Demarches.carsat);
    const logoCpam = component.getLogoKey(Demarches.cpam);
    const logoOther = component.getLogoKey(Demarches.other);
    expect(logoCaf).toEqual('caf');
    expect(logoCarsat).toEqual('carsat');
    expect(logoCpam).toEqual('cpam');
    expect(logoOther).toEqual('other');
  });
});
