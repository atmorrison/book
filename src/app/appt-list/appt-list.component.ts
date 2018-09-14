import { Component, OnInit } from '@angular/core';

import { AppointmentService } from '../appointment.service';

import { User } from '../user';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appt-list',
  templateUrl: './appt-list.component.html',
  styleUrls: ['./appt-list.component.css']
})
export class ApptListComponent implements OnInit {

  constructor(private apptService: AppointmentService) { }

  ngOnInit() {
    this.getAppointments();
  }

  appointments: Appointment[];

  getAppointments(): void {
    this.apptService.getAppointments()
      .subscribe(appts => this.appointments = appts);
  }
}
