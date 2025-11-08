import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationEffectivenessComponent } from './vaccination-effectiveness.component';

describe('VaccinationEffectivenessComponent', () => {
  let component: VaccinationEffectivenessComponent;
  let fixture: ComponentFixture<VaccinationEffectivenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VaccinationEffectivenessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationEffectivenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
