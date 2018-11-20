import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage.interface';

@Component({
    selector: 'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
        <form #form="ngForm" novalidate (ngSubmit)="handleSubmit(form.value, form.valid)">
            <div>
                Passenger name:
                <input 
                    type="text"
                    name="fullname"
                    required
                    minlength="2"
                    #fullname="ngModel"
                    [ngModel]="detail?.fullname"
                >
                <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
                    Passenger name is required
                </div>
                <div *ngIf="fullname.errors?.minlength && fullname.dirty" class="error">
                Passenger name is too short
            </div>
            </div>
            <div>
                Passenger ID:
                <input 
                    type="number"
                    name="id"
                    required
                    #id="ngModel"
                    [ngModel]="detail?.id"
                >
                <div *ngIf="id.errors?.required && id.touched" class="error">
                    Passenger ID is required
                </div>
            </div>
            <div>
                Checked in:
                <input 
                    type="checkbox"
                    name="checkedIn"
                    [ngModel]="detail?.checkedIn"
                    (ngModelChange)="toggleCheckIn($event)"
                >
            </div>
            <div *ngIf="form.value.checkedIn">
                Check in date:
                <input
                    type="number"
                    name="checkInDate"
                    [ngModel]="detail?.checkInDate">
            </div>
            <div>
                Luggage:
                <select
                    name="baggage"
                    [ngModel]="detail?.baggage"
                > 
                    <option
                        *ngFor="let item of baggage;"
                        [ngValue]="item.key"
                    >
                        {{ item.value}}
                    </option>
                </select>
            </div>

            <button type="submit" [disabled]="form.invalid">
                Update passenger
            </button>
        </form>  
    `
})
export class PassengerFormComponent {
    
    @Input()
    detail: Passenger;

    @Output()
    update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    baggage: Baggage[] = [{
        key: 'none',
        value: 'No baggage'
    },{
        key: 'hand-only',
        value: 'Hand baggage'
    },{
        key: 'hold-only',
        value: 'Hold baggage'
    },{
        key: 'hand-hold',
        value: 'Hand and hold baggage'
    }];

    toggleCheckIn(checkedIn: boolean) {
        if (checkedIn) {
            this.detail.checkInDate = Date.now();
        }
    }

    handleSubmit(passenger: Passenger, isValid: boolean) {
        if (isValid) {
            this.update.emit(passenger);
        }
    }
}