import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'stop-button',
  templateUrl: './stop-button.component.html',
  styleUrls: ['./stop-button.component.scss'],
  animations: [
    trigger('stop', [
      transition('* => stop', [
        animate('0.25s ease-in', style({ transform: 'scale(.8)' }))
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopButtonComponent implements OnInit {
  stop: boolean = true;
  animationEnd: boolean = false;
  click$: Subject<boolean> = new Subject<boolean>();
  @Output() stop$ = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  changeState() {
    this.stop = !this.stop;
    this.stop$.emit(this.stop);
    this.animationEnd = false;
    this.click$.next(true);
  }

  test(e: AnimationEvent) {
    if (e.animationName == 'press') {
      this.animationEnd = true;
    }
  }

}
