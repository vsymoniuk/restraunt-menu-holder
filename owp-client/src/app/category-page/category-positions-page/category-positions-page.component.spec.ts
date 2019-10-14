import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPositionsPageComponent } from './category-positions-page.component';

describe('CategoryPositionsPageComponent', () => {
  let component: CategoryPositionsPageComponent;
  let fixture: ComponentFixture<CategoryPositionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPositionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPositionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
