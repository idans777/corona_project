import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCasesComponent } from './child-cases.component';

describe('ChildCasesComponent', () => {
  let component: ChildCasesComponent;
  let fixture: ComponentFixture<ChildCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
