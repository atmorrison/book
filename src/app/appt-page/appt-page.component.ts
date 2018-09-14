import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private apptService: AppointmentService
  ) { }

  appointment: Appointment;
  people: User[];
  addingNote: boolean;
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
          this.getUsers();
        })
    });
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

  edit(): void {
    const Id = this.appointment.Id;
    this.router.navigate([`/a/${Id}/edit`]);
  }

}
