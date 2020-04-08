import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-runway',
  templateUrl: './runway.component.html',
  styleUrls: ['./runway.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunwayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
