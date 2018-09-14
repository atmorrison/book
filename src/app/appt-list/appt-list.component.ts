import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppointmentService } from '../appointment.service';

import { User } from '../user';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appt-list',
  templateUrl: './appt-list.component.html',
  styleUrls: ['./appt-list.component.css']
})
export class ApptListComponent implements OnInit {

  constructor(
    private router: Router,
    private apptService: AppointmentService
    ) { }

  ngOnInit() {
    this.getUsers();
  }

  appointments: Appointment[];
  people: User[];
  sortedAppts: Appointment[][] = [];
  apptDates: Date[] = [];
  @Input('userId') userId = "";

  getAppointments(): void {
    this.apptService.getAppointments()
      .subscribe(appts => {
        this.appointments = appts;
        if (this.userId) {
          this.appointments = this.appointments.filter((appt) => {
            return appt.Party.includes(parseInt(this.userId));
          })
        }
        this.sortByDate();
      });
  }

  getUsers(): void {
    this.apptService.getUsers()
      .subscribe(users => {
        this.people = users; 
        this.getAppointments();
      })
  }

  getUserById(Id: number): User {
    for (let user of this.people) {
      if (user.Id===Id) {
        return user;
      }
    }
    return {Name: "UnknownUser"} as User;
  }

  dateCompare(a: Appointment, b: Appointment): number {
    if (a.Start<b.Start) {
      return -1;
    } else if (a.Start===b.Start) {
      return 0;
    } else {
      return 1;
    }
  }

  sortByDate(): void { 
    this.appointments.sort(this.dateCompare);
    for (let appt of this.appointments) {
      appt.Start = new Date(appt.Start);
      appt.End = new Date(appt.End);
      if (this.apptDates.length===0) {    //if no sorted appts yet, store first appt
        const apptDate = new Date(
          appt.Start.getFullYear(),
          appt.Start.getMonth(),
          appt.Start.getDate()
        )
        this.sortedAppts[this.sortedAppts.length] = [appt];     //appts get grouped by day they occur
        this.apptDates[this.apptDates.length] = apptDate;     //apptDates keeps track of date associated with each group
      } else {
        const currentDate = this.apptDates[this.apptDates.length - 1];
        const apptDate = new Date(
          appt.Start.getFullYear(),
          appt.Start.getMonth(),
          appt.Start.getDate()
        )
        if (apptDate.toDateString()===currentDate.toDateString()) {
          this.sortedAppts[this.sortedAppts.length-1].push(appt);
        } else {
          this.sortedAppts[this.sortedAppts.length] = [appt];
          this.apptDates[this.apptDates.length] = apptDate; 
        }
      }
    }
  }

  gotoUser(Id: number, e: Event): void {
    e.stopPropagation();
    this.router.navigate([`/u/${Id}`]);
  }

}
