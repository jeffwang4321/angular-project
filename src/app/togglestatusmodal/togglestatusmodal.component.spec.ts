import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglestatusmodalComponent } from './togglestatusmodal.component';

describe('TogglestatusmodalComponent', () => {
  let component: TogglestatusmodalComponent;
  let fixture: ComponentFixture<TogglestatusmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TogglestatusmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TogglestatusmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
