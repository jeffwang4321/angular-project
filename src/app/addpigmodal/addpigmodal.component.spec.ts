import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpigmodalComponent } from './addpigmodal.component';

describe('AddpigmodalComponent', () => {
  let component: AddpigmodalComponent;
  let fixture: ComponentFixture<AddpigmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpigmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpigmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
