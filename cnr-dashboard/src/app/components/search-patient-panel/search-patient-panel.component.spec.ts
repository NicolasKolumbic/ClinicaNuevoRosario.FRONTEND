import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPatientPanelComponent } from './search-patient-panel.component';

describe('SearchPatientPanelComponent', () => {
  let component: SearchPatientPanelComponent;
  let fixture: ComponentFixture<SearchPatientPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPatientPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPatientPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
