import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCombo2Component } from './group-combo2.component';

describe('GroupCombo2Component', () => {
  let component: GroupCombo2Component;
  let fixture: ComponentFixture<GroupCombo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCombo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCombo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
