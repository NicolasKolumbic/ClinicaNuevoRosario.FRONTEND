import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorBoardComponent } from './administrator-board.component';

describe('AdministratorBoardComponent', () => {
  let component: AdministratorBoardComponent;
  let fixture: ComponentFixture<AdministratorBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
