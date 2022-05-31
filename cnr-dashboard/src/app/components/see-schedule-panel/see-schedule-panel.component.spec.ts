import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeSchedulePanelComponent } from './see-schedule-panel.component';

describe('SeeSchedulePanelComponent', () => {
  let component: SeeSchedulePanelComponent;
  let fixture: ComponentFixture<SeeSchedulePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeSchedulePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeSchedulePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
