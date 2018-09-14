import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApptComponent } from './new-appt.component';

describe('NewApptComponent', () => {
  let component: NewApptComponent;
  let fixture: ComponentFixture<NewApptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
