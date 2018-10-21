import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDown2Component } from './drop-down2.component';

describe('DropDown2Component', () => {
  let component: DropDown2Component;
  let fixture: ComponentFixture<DropDown2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDown2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDown2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
