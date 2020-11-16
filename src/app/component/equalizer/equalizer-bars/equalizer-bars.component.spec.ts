import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizerBarComponent } from './equalizer-bars.component';

describe('EqualizerBarComponent', () => {
  let component: EqualizerBarComponent;
  let fixture: ComponentFixture<EqualizerBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqualizerBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualizerBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
