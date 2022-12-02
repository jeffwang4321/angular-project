import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordmodalComponent } from './passwordmodal.component';

describe('PasswordmodalComponent', () => {
  let component: PasswordmodalComponent;
  let fixture: ComponentFixture<PasswordmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
