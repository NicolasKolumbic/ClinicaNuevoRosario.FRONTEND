import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFileManagmentComponent } from './image-file-managment.component';

describe('ImageFileManagmentComponent', () => {
  let component: ImageFileManagmentComponent;
  let fixture: ComponentFixture<ImageFileManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFileManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFileManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
