import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEjectComponent } from './button-eject.component';

describe('ButtonEjectComponent', () => {
  let component: ButtonEjectComponent;
  let fixture: ComponentFixture<ButtonEjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonEjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonEjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
