import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  colorScheme: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  darkMode: boolean = this.colorScheme.matches;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.colorScheme.addListener(val => {
      this.darkMode = val.matches;
      this.cdr.detectChanges();
    })
  }
}
