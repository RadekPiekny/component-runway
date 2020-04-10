import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { IButtonOutlineStyle } from 'src/app/model/buttons.model';

@Component({
  selector: 'button-play',
  templateUrl: './button-play.component.html',
  styleUrls: ['./button-play.component.scss'],
  animations: [
    trigger('play', [
      transition(':enter', [
        style({ transform: 'scale(.8)', opacity: 0 }),
        animate('0.25s ease-in')
      ]),
      transition(':leave', [
        animate('0.25s ease-in', style({ transform: 'scale(.8)', opacity: 0 }))
      ]),
    ]),
    trigger('pauseLeft', [
      transition(':enter', [
        style({ transform: 'translate(-8px)', opacity: 0 }),
        animate('0.25s ease-in')
      ]),
      transition(':leave', [
        animate('0.25s ease-in', style({ transform: 'translate(-8px)', opacity: 1 }))
      ]),
    ]),
    trigger('pauseRight', [
      transition(':enter', [
        style({ transform: 'translate(8px', opacity: 0 }),
        animate('0.25s ease-in')
      ]),
      transition(':leave', [
        animate('0.25s ease-in', style({ transform: 'translate(8px)', opacity: 1 }))
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPlayComponent {
  @Input() buttonOutlineStyle: IButtonOutlineStyle;
  @Input() playing: boolean = false;
  @Output() playing$ = new EventEmitter<boolean>();
  constructor() { }

  changeState() {
    this.playing = !this.playing;
    this.playing$.emit(this.playing);
  }

}
