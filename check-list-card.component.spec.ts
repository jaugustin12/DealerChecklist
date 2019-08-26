import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListCardComponent } from './check-list-card.component';

describe('CheckListCardComponent', () => {
  let component: CheckListCardComponent;
  let fixture: ComponentFixture<CheckListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
