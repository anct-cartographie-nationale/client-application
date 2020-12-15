import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Time } from '../models/time.model';

import { FormComponent } from './form.component';

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.structureForm = new FormGroup({
      structureType: new FormArray([new FormControl('mediatheque'), new FormControl('cyber')]),
      structureName: new FormControl('structure.structureName', Validators.required),
      structureRepresentation: new FormControl('structure.structureRepresentation', Validators.required),
      description: new FormControl('structure.description'),
      lockdownActivity: new FormControl('structure.lockdownActivity'),
      address: new FormGroup({
        numero: new FormControl('structure.address.numero'),
        street: new FormControl('structure.address.street', Validators.required),
        commune: new FormControl('structure.address.commune', Validators.required),
      }),
      contactPhone: new FormControl('structure.contactPhone', Validators.required),
      contactMail: new FormControl('structure.contactMail', Validators.required),
      website: new FormControl('structure.website'),
      facebook: new FormControl('structure.facebook'),
      twitter: new FormControl('structure.twitter'),
      instagram: new FormControl('structure.instagram'),
      gender: new FormControl('structure.gender'),
      contactName: new FormControl('structure.contactName'),
      contactSurname: new FormControl('structure.contactSurname'),
      fonction: new FormControl('structure.fonction'),
      pmrAccess: new FormControl('structure.pmrAccess'),
      documentsMeeting: new FormControl('structure.documentsMeeting'),
      hours: new FormGroup({
        monday: new FormGroup({
          open: new FormControl(true, Validators.required),
          time: new FormArray([
            new FormGroup({
              openning: new FormControl(900, Validators.required),
              closing: new FormControl(1200, Validators.required),
            }),
          ]),
        }),
        tuesday: new FormGroup({
          open: new FormControl(true, Validators.required),
          time: new FormArray([]) as FormArray,
        }),
        wednesday: new FormGroup({
          open: new FormControl(true, Validators.required),
          time: new FormArray([]) as FormArray,
        }),
        thursday: new FormGroup({
          open: new FormControl(true, Validators.required),
          time: new FormArray([]) as FormArray,
        }),
        friday: new FormGroup({
          open: new FormControl(true, Validators.required),
          time: new FormArray([]) as FormArray,
        }),
        saturday: new FormGroup({
          open: new FormControl(false, Validators.required),
          time: new FormArray([]) as FormArray,
        }),
        sunday: new FormGroup({
          open: new FormControl(false, Validators.required),
          time: new FormArray([]) as FormArray,
        }),
      }),
      exceptionalClosures: new FormControl('structure.exceptionalClosures'),
      labelsQualifications: new FormControl([]),
      accessModality: new FormControl([]),
      publicsAccompaniment: new FormControl([]),
      equipmentsAndServices: new FormControl([]),
      publics: new FormControl([]),
      baseSkills: new FormControl([]),
      accessRight: new FormControl([]),
      parentingHelp: new FormControl([]),
      socialAndProfessional: new FormControl([]),
      digitalCultureSecurity: new FormControl([]),
      nbComputers: new FormControl('structure.nbComputers'),
      nbPrinters: new FormControl('structure.nbPrinters'),
      nbTablets: new FormControl('structure.nbTablets'),
      nbNumericTerminal: new FormControl('structure.nbNumericTerminal'),
      equipmentsDetails: new FormControl('structure.equipmentsDetails'),
      equipmentsAccessType: new FormControl([]),
    });
  });

  it('should return the correct Abstract Control', () => {
    const nameControl = 'structureName';
    const control = component.getStructureControl(nameControl);
    const expectControl = component.structureForm.get(nameControl);
    expect(control).toEqual(expectControl);
  });

  it('should return the correct Abstract Control from address', () => {
    const nameControl = 'street';
    const control = component.getAddressControl(nameControl);
    const addressForm = component.structureForm.get('address').get(nameControl);
    expect(control).toEqual(addressForm);
  });
  it('should return the correct Time from a specific day', () => {
    const day = 'monday';
    const control = component.getTime(day);
    const TimeForm = component.structureForm.get('hours').get(day).get('time') as FormArray;
    expect(control).toEqual(TimeForm);
  });
  it('should return true', () => {
    const day = 'monday';
    const control = component.isOpen(day);
    expect(control).toEqual(true);
  });
  it('should return check if value is in formArray', () => {
    const nameControl = 'structureType';
    const isInArray = component.isInArray('cyber', nameControl);
    const isntInArray = component.isInArray('unknowType', nameControl);
    expect(isInArray).toEqual(true);
    expect(isntInArray).toEqual(false);
  });
});
