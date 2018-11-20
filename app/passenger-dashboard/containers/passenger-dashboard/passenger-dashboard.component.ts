import { Component, OnInit } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';
import { Router } from '@angular/router';

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
                    (view)="handleView($event)"
                >
                </passenger-detail>
            </ul>
        </div>
    `
})
export class PassengerDashboardComponent implements OnInit {
    passengers: Passenger[];
    
    constructor(
        private router: Router,
        private passengerService: PassengerDashboardService
    ) {
    }

    ngOnInit() {
        this.passengerService
            .getPassengers()
            .subscribe(
                (data: Passenger[]) => this.passengers = data,
                (error: any) => {
                    console.log(error);
                });
    }
    
    handleEdit(event: Passenger) {
        this.passengerService
            .updatePassenger(event)
            .subscribe(
                (data: Passenger) => {
                    this.passengers = this.passengers.map((p: Passenger) => {
                        if (p.id === data.id) {
                            p = Object.assign({}, p, event);
                        }
                        return p;
                    });
                },
                (error: any) => {
                    console.log(error);
                });
    }

    handleRemove(event: Passenger) {
        this.passengerService
            .removePassenger(event)
            .subscribe(
                (data: Passenger) => {
                    this.passengers = this.passengers.filter((p: Passenger) => p.id !== data.id);
                },
                (error: any) => {
                    console.log(error);
                });
    }

    handleView(event: Passenger) {
        this.router.navigate(['/passengers', event.id]);
    }
}