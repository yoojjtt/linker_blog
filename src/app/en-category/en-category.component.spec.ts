import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnCategoryComponent } from './en-category.component';

describe('EnCategoryComponent', () => {
  let component: EnCategoryComponent;
  let fixture: ComponentFixture<EnCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
