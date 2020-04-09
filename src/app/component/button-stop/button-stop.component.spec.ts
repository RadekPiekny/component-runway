import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStopComponent } from './button-stop.component';

describe('StopButtonComponent', () => {
  let component: ButtonStopComponent;
  let fixture: ComponentFixture<ButtonStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
