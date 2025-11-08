import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityTrafficLightModelComponent } from './community-traffic-light-model.component';

describe('CommunityTrafficLightModelComponent', () => {
  let component: CommunityTrafficLightModelComponent;
  let fixture: ComponentFixture<CommunityTrafficLightModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityTrafficLightModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityTrafficLightModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
