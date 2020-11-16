import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizerWaveComponent } from './equalizer.component';

describe('EqualizerWaveComponent', () => {
  let component: EqualizerWaveComponent;
  let fixture: ComponentFixture<EqualizerWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqualizerWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualizerWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
