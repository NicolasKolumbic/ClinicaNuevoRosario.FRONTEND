import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypePillComponent } from './service-type-pill.component';

describe('ServiceTypePillComponent', () => {
  let component: ServiceTypePillComponent;
  let fixture: ComponentFixture<ServiceTypePillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTypePillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypePillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
