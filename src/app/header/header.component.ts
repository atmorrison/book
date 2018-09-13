import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { User } from '../user';

import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users$: Observable<User[]>;
  searching: boolean = false;
  private searchTerms = new Subject<string>();

  constructor(private apptService: AppointmentService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {return of([])}
    return this.apptService.getUsers().pipe(
      map(users => users.filter(user => user.Name.toLowerCase().startsWith(term.toLowerCase())))
    )
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchUsers(term))
    )
  }

}
