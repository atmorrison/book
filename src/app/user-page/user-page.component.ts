import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppointmentService } from '../appointment.service';

import { User } from '../user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apptService: AppointmentService
  ) { }

  user: User;

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    let Id: number;
    this.route.params.subscribe(params => {
       this.apptService.getUser(parseInt(params['Id']))
        .subscribe(user => this.user = user)
    });
  }

  goBack(): void {
    this.location.back();
  }

}
