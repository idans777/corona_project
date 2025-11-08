import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedCasesComponent } from './imported-cases.component';

describe('ImportedCasesComponent', () => {
  let component: ImportedCasesComponent;
  let fixture: ComponentFixture<ImportedCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportedCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
