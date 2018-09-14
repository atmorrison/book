import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppointmentService } from '../appointment.service';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-new-appt',
  templateUrl: './new-appt.component.html',
  styleUrls: ['./new-appt.component.css']
})
export class NewApptComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private apptService: AppointmentService
  ) { }

  appointment: Appointment;
  people: User[];
  originatingId: number;
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
        this.originatingId = parseInt(params['userId']);
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        )
        this.appointment = {
          ProviderEmail: "andretuparamorrison@gmail.com",
          Start: today,
          End: today,
          Notes: [],
          Description: "",
          Party: []
        } as Appointment;
        console.log(this.appointment)
        if (this.originatingId!==0) {this.appointment.Party.push(this.originatingId)}
        this.setTimes();
        this.getUsers(); 
    });
  }

  setTimes(): void {
    const start = this.appointment.Start;
    const end = this.appointment.End;
    this.date = {
      day: start.getDate(),
      month: start.getMonth() + 1,
      year: start.getFullYear()
    };
    this.startTime = {
      hour: start.getHours(),
      minute: start.getMinutes(),
      second: 0
    };
    this.endTime = {
      hour: end.getHours(),
      minute: end.getMinutes(),
      second: 0
    };
  }

  getUsers(): void {
    this.people = [];
    for (let Id of this.appointment.Party) {
      this.apptService.getUser(Id)
        .subscribe(user => this.people.push(user))
    }
  }

  removeUser(user: User): void {
    const peopleIndex = this.people.indexOf(user);
    const partyIndex = this.appointment.Party.indexOf(user.Id);
    this.appointment.Party.splice(partyIndex, 1);
    this.people.splice(peopleIndex, 1);
  }

  addNote(): void {
    const noteText = this.newNote.nativeElement.value;
    this.addingNote=false;
    this.appointment.Notes.push(noteText);
  }

  deleteNote(index: number): void {
    this.appointment.Notes.splice(index, 1)
  }

  goBack(): void {
    const result = confirm("Go back without submitting? All changes will be lost.")
    if (result) {
      if (this.originatingId===0) {
        this.router.navigateByUrl("", { skipLocationChange: true });
      } else {
        this.router.navigateByUrl(`/u/${this.originatingId}`, { skipLocationChange: true });
      }
    }
  }

  submit(): void {
    if (this.appointment.Description.length===0) {
      alert("Description cannot be blank");
      return null;
    }
    if (this.people.length===0) {
      alert("Party cannot be empty");
      return null;
    }
    const start = new Date(
      this.date.year,
      this.date.month - 1,
      this.date.day,
      this.startTime.hour,
      this.startTime.minute
    )
    const end = new Date(
      this.date.year,
      this.date.month - 1,
      this.date.day,
      this.endTime.hour,
      this.endTime.minute
    )
    this.appointment.Start = start;
    this.appointment.End = end;

    this.appointment.Party = this.people.map(user => user.Id);

    this.apptService.createAppointment(this.appointment)
      .subscribe((appt) => this.router.navigate([`/a/${appt.Id}`]))
  }

  trackByFn(index: any, item: any) {
    return index;
 }

}
