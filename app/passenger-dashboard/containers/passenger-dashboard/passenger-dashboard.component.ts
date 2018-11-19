import { Component, OnInit } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
    selector: 'passenger-dashboard',
    styleUrls: ['passenger-dashboard.component.scss'],
    template: `
        <div>
            <passenger-count
              [items]="passengers">
            </passenger-count>
            <div *ngFor="let passenger of passengers;">
                {{ passenger.fullname}}
            </div>
            <ul>
                <passenger-detail
                    *ngFor="let passenger of passengers;"
                    [detail]="passenger"
                    (edit)="handleEdit($event)"
                    (remove)="handleRemove($event)"
                >
                </passenger-detail>
            </ul>
        </div>
    `
})
export class PassengerDashboardComponent implements OnInit {
    passengers: Passenger[];
    
    constructor(private passengerService: PassengerDashboardService) {
    }

    ngOnInit() {
        this.passengers = this.passengerService.getPassengers();
    }
    
    handleEdit(event: Passenger) {
        this.passengers = this.passengers.map((p: Passenger) => {
            if (p.id === event.id) {
                p = Object.assign({}, p, event);
            }
            return p;
        });
    }

    handleRemove(event: Passenger) {
        this.passengers = this.passengers.filter((p: Passenger) => p.id !== event.id);
    }
}