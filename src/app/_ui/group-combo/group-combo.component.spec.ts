import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComboComponent } from './group-combo.component';

describe('GroupComboComponent', () => {
  let component: GroupComboComponent;
  let fixture: ComponentFixture<GroupComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
