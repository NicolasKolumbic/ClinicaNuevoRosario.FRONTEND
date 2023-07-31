import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAvatarComponent } from './generic-avatar.component';

describe('GenericAvatarComponent', () => {
  let component: GenericAvatarComponent;
  let fixture: ComponentFixture<GenericAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
