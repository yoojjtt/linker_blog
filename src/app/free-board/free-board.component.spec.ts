import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeBoardComponent } from './free-board.component';

describe('FreeBoardComponent', () => {
  let component: FreeBoardComponent;
  let fixture: ComponentFixture<FreeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
