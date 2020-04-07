import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
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
export class PlayButtonComponent implements OnInit {
  playing: boolean = false;
  @Output() playing$ = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  changeState() {
    this.playing = !this.playing;
    this.playing$.emit(this.playing);
  }

}
