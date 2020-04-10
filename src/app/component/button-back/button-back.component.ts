import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IButtonOutlineStyle } from './../../model/buttons.model';

@Component({
  selector: 'button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonBackComponent {
  @Input() buttonOutlineStyle: IButtonOutlineStyle;
  clickToggle: boolean;

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
