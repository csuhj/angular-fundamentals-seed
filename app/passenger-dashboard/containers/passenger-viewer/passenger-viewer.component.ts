import { Component, OnInit } from '@angular/core';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

import { Passenger } from '../../models/passenger.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'passenger-viewer',
    styleUrls: ['passenger-viewer.component.scss'],
    template: `
        <div>
            <button (click)="goBack()">
                &lsaquo; Go back
            </button>
            <passenger-form
                [detail]="passenger"
                (update)="onUpdatePassenger($event)"
            >
            </passenger-form>
        </div>
    `
})
export class PassengerViewerComponent implements OnInit {
    passenger: Passenger;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private passengerService: PassengerDashboardService
    ) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((data: Params) => this.passengerService.getPassenger(data.id))
            .subscribe(
                (data: Passenger) => this.passenger = data,
                (error: any) => {
                    console.log(error);
                });
    }

    onUpdatePassenger(event: Passenger) {
        this.passengerService
            .updatePassenger(event)
            .subscribe(
                (data: Passenger) => {
                    this.passenger = Object.assign({}, data, event);
                },
                (error: any) => {
                    console.log(error);
                });
    }

    goBack() {
        this.router.navigate(['/passengers']);
    }
}