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
        [ngModel]="name"
        (ngModelChange)="handleChange($event)"
      />

      <!--Two way binding [(ngModel)] -->
      <input 
        type="text"
        [(ngModel)]="name"
      />
      <div>{{ name }}</div>
    </div>
  `
})
export class AppComponent {
  name: string = 'Adam';
  
  handleChange(value: string) {
    this.name = value;
  }

  handleClick() {
    this.name = "Ads";
  }
}