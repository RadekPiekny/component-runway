import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'button-forward',
  templateUrl: './button-forward.component.html',
  styleUrls: ['./button-forward.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonForwardComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
