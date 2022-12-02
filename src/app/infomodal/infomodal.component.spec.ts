import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfomodalComponent } from './infomodal.component';

describe('InfomodalComponent', () => {
  let component: InfomodalComponent;
  let fixture: ComponentFixture<InfomodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfomodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
