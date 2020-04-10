import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { IButtonOutlineStyle, HTMLInputEvent } from './../../model/buttons.model';

@Component({
  selector: 'button-eject',
  templateUrl: './button-eject.component.html',
  styleUrls: ['./button-eject.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonEjectComponent {
  clickToggle: boolean;
  @Input() buttonOutlineStyle: IButtonOutlineStyle;
  @Output() files: EventEmitter<FileList> = new EventEmitter<FileList>();

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

  filesChange(e: HTMLInputEvent) {
    this.files.emit(e.target.files);
  }

}

