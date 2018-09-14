import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppointmentService } from '../appointment.service';

import { User } from '../user';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appt-page',
  templateUrl: './appt-page.component.html',
  styleUrls: ['./appt-page.component.css']
})
export class ApptPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apptService: AppointmentService
  ) { }

  appointment: Appointment;

  ngOnInit() {
    this.getAppointment();
  }

  getAppointment(): void {
    let Id: number;
    this.route.params.subscribe(params => {
       this.apptService.getAppointment(parseInt(params['Id']))
        .subscribe(appt => this.appointment = appt)
    });
  }

}
