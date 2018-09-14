import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptEditComponent } from './appt-edit.component';

describe('ApptEditComponent', () => {
  let component: ApptEditComponent;
  let fixture: ComponentFixture<ApptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
