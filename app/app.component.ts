import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: `
    <div class="app">
      <button (click)="handleClick()">
        Change name
      </button>
      <input 
        type="text"
        [value]="name"
        (input)="handleInput($event)"
        (blur)="handleBlur($event)"
      />
      <div>{{ name }}</div>
    </div>
  `
})
export class AppComponent {
  name: string = 'Adam';
  
  handleBlur(event: any) {
    this.name = event.target.value;
  }

  handleInput(event: any) {
    this.name = event.target.value;
  }

  handleClick() {
    this.name = "Ads";
  }
}