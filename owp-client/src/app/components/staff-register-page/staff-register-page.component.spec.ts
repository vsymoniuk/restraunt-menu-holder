import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRegisterPageComponent } from './staff-register-page.component';

describe('StaffRegisterPageComponent', () => {
  let component: StaffRegisterPageComponent;
  let fixture: ComponentFixture<StaffRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
