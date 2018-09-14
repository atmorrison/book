import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppointmentService } from '../appointment.service';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appt-edit',
  templateUrl: './appt-edit.component.html',
  styleUrls: ['./appt-edit.component.css']
})
export class ApptEditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private apptService: AppointmentService
  ) { }

  appointment: Appointment;
  people: User[];
  addingNote: boolean;
  date: NgbDateStruct;
  startTime: NgbTimeStruct;
  endTime: NgbTimeStruct;
  @ViewChild('newNote') newNote;

  ngOnInit() {
    this.getAppointment();
  }

  getAppointment(): void {
    let Id: number;
    this.route.params.subscribe(params => {
       this.apptService.getAppointment(parseInt(params['Id']))
        .subscribe(appt => {
          this.appointment = appt;
          this.setTimes();
          this.getUsers();
        })
    });
  }

  setTimes(): void {
    const start = this.appointment.Start;
    const end = this.appointment.End;
    this.date = {
      day: start.getDate(),
      month: start.getMonth(),
      year: start.getFullYear()
    };
    this.startTime = {
      hour: start.getHours(),
      minute: start.getMinutes(),
      second: start.getSeconds()
    };
    this.endTime = {
      hour: end.getHours(),
      minute: end.getMinutes(),
      second: end.getSeconds()
    };
  }

  getUsers(): void {
    this.people = [];
    for (let Id of this.appointment.Party) {
      this.apptService.getUser(Id)
        .subscribe(user => this.people.push(user))
    }
  }

  addNote(): void {
    const noteText = this.newNote.nativeElement.value;
    this.appointment.Notes.push(noteText);
    this.apptService.updateAppointment(this.appointment)
      .subscribe(() => this.addingNote=false);
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate([''])
    }
  }

}
