import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-eject',
  templateUrl: './button-eject.component.html',
  styleUrls: ['./button-eject.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonEjectComponent implements OnInit {
  clickToggle: boolean;
  @Output() files: EventEmitter<FileList> = new EventEmitter<FileList>();
  constructor() { }

  ngOnInit(): void {
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

  filesChange(e: HTMLInputEvent) {
    this.files.emit(e.target.files);
  }

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}