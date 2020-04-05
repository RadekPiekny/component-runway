import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'stop-button',
  templateUrl: './stop-button.component.html',
  styleUrls: ['./stop-button.component.css'],
  animations: [
    trigger('stop', [
      transition('play => stop', [
        animate('0.25s ease-in', style({ transform: 'scale(.8)' }))
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopButtonComponent implements OnInit {
  stop: boolean = true;
  @Output() stop$ = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  changeState() {
    this.stop = !this.stop;
    this.stop$.emit(this.stop);
  }

}
