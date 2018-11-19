import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: `
    <div class="app">
      {{ title + '!' }}
      <div>
        {{ numberOne + numberTwo }}
      </div>
      <div>
        {{ isHappy ? ':)' : ':(' }}
      </div>
    </div>
  `
})
export class AppComponent {
  title: string;
  numberOne: number = 1;
  numberTwo: number = 2;
  isHappy: boolean = false;

  constructor() {
    this.title = 'Ultimate Angular'
  }
}