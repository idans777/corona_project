import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMorbidityIndicatorsComponent } from './general-morbidity-indicators.component';

describe('GeneralMorbidityIndicatorsComponent', () => {
  let component: GeneralMorbidityIndicatorsComponent;
  let fixture: ComponentFixture<GeneralMorbidityIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralMorbidityIndicatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralMorbidityIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
