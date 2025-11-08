import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralGraphCardComponent } from './general-graph-card.component';

describe('GeneralGraphCardComponent', () => {
  let component: GeneralGraphCardComponent;
  let fixture: ComponentFixture<GeneralGraphCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralGraphCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralGraphCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
