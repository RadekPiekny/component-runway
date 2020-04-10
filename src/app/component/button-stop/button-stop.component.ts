import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { IButtonOutlineStyle } from 'src/app/model/buttons.model';

@Component({
  selector: 'button-stop',
  templateUrl: './button-stop.component.html',
  styleUrls: ['./button-stop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonStopComponent {
  @Input() buttonOutlineStyle: IButtonOutlineStyle;
  stop: boolean = true;
  clickToggle: boolean;
  click$: Subject<boolean> = new Subject<boolean>();
  @Output() stop$ = new EventEmitter<boolean>();

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
