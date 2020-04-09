import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'button-stop',
  templateUrl: './button-stop.component.html',
  styleUrls: ['./button-stop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonStopComponent implements OnInit {
  stop: boolean = true;
  clickToggle: boolean;
  click$: Subject<boolean> = new Subject<boolean>();
  @Output() stop$ = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  changeState() {
    this.stop$.emit(true);
  }

  animate() {
    if (this.clickToggle===undefined) {
      this.clickToggle=true;
      return;
    }
    this.clickToggle=!this.clickToggle;
  }

  get getClass() {
    if (this.clickToggle===undefined) {
      this.clickToggle=true;
      return null;
    }
    return this.clickToggle ? 'pressed':'pressed-again';
  }

}
