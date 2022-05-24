import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchEngineComponent } from './doctor-search-engine.component';

describe('DoctorSearchEngineComponent', () => {
  let component: DoctorSearchEngineComponent;
  let fixture: ComponentFixture<DoctorSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSearchEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
