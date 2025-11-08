import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTableCardComponent } from './general-table-card.component';

describe('GeneralTableCardComponent', () => {
  let component: GeneralTableCardComponent;
  let fixture: ComponentFixture<GeneralTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralTableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
